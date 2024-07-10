<script setup lang="ts">
import { type DataTableRowKey, NButton, NDataTable, NDivider, NEl } from 'naive-ui'
import { computed, reactive, ref, shallowRef, useAttrs, watch } from 'vue'
import type { Key } from '../../types'
import type { AtTableProps } from './type'
import useColumns from './hooks/use-columns'
import useData from './hooks/use-data'
import RightUtils from './components/RightUtils.vue'

const props = withDefaults(defineProps<AtTableProps>(), {
  rightUtils: () => ['size', 'reload', 'fullscreen', 'setting'],
  size: 'medium',
  deepReactive: false,
  defaultExpandAll: false,
  autoFetch: true,
  outerBordered: true,
  pagerKeys: () => ({ page: 'page', pageSize: 'size', total: 'meta.total', list: 'data' }),
})
const $tableWrapper = shallowRef<HTMLDivElement>()
const size = ref(props.size)
const rowClassName = computed(() => {
  if (props.rowClassName) {
    if (typeof props.rowClassName === 'string')
      return `${props.rowClassName} at-table-row`

    return (row: any) => `${(props.rowClassName as any)?.(row)} at-table-row`
  }
  return `at-table-row`
})
const { columns } = useColumns(() => props)

const checkedKeys = ref<DataTableRowKey[]>([])
const checkedRows = shallowRef<any[]>([])
/** 数据刷新时，选中行的数据最好也要刷新一下，避免前后数据不一致的问题 */
function updateCheckedRows() {
  if (checkedKeys.value.length === 0 || !props.selection)
    return
  checkedRows.value.forEach((oldRow, idx) => {
    // 分页数据可能没有当前行数据，只有找到了才进行更新
    if (!props.rowKey)
      return

    // eslint-disable-next-line ts/no-use-before-define
    const newRow = data.value.find(row => props.rowKey?.(row) === props.rowKey?.(oldRow))
    if (newRow)
      checkedRows.value[idx] = newRow
  })
}
function handleCheck(keys: DataTableRowKey[], rows: any[]) {
  checkedKeys.value = keys
  const newRows: any[] = []
  rows.forEach((row, idx) => {
    // 找到不存在的行，从旧的数据中取出，避免出现 undefined 的情况
    if (!row) {
      newRows.push(checkedRows.value[idx])
      return
    }
    newRows.push(row)
  })
  checkedRows.value = newRows
}
function getSelectedData<T>() {
  return {
    count: checkedKeys.value.length,
    checkedKeys: checkedKeys.value,
    checkedRows: checkedRows.value as unknown as T[],
  }
}
const { data, loading, pagination, filter, refresh, handleSorterChange, computedScrollX } = useData({ propsGetter: () => props, columns, updateCheckedRows })
/** 异步数据支持展开所有行 */
const attrs = useAttrs() as any
function resolveExpandedRowKeys(rows: any[]) {
  const keys: Key[] = []
  rows.forEach((row) => {
    const children = row[attrs['children-key'] ?? 'children']
    if (children && children.length > 0) {
      const key = props.rowKey!(row)
      keys.push(key, ...resolveExpandedRowKeys(children))
    }
  })
  return keys
}
const defaultExpandedRowKeys = ref<Key[]>([])
const stop = watch(data, () => {
  stop()
  if (!props.defaultExpandAll)
    return

  if (!props.rowKey)
    return

  // 无法直接替换 defaultExpandedRowKeys
  defaultExpandedRowKeys.value.push(...resolveExpandedRowKeys(data.value))
})
function clearSelection() {
  checkedKeys.value = []
  checkedRows.value = []
}

defineExpose(
  reactive({
    loading,
    filter,
    refresh,
    getSelectedData,
    data,
    clearSelection,
  }),
)
</script>

<template>
  <NEl class="h-full">
    <div ref="$tableWrapper" :class="{ 'bd-base': outerBordered }" class="h-full rounded-base bg-base p3 pt0 text-sm text-base" flex="~ col">
      <div class="shrink-0 py2" :class="props.headerCls" flex="~ justify-between items-center">
        <div class="flex items-center">
          <slot v-if="checkedKeys.length === 0" name="title">
            <div class="text-16px">
              {{ tableTitle }}
            </div>
          </slot>
          <template v-if="checkedKeys.length > 0">
            <span text-gray>
              当前已选中
              <strong class="text-red">{{ checkedKeys.length }}</strong>
              项，
              <NButton size="small" type="info" text @click="handleCheck([], [])"> 取消所有 </NButton>
            </span>
          </template>
        </div>
        <div flex="~ items-center gap2">
          <slot name="extra" />
          <NDivider v-if="$slots?.extra" vertical />
          <RightUtils v-model:size="size" class="my1" :options="props.rightUtils" :wrapper="$tableWrapper" :reload="refresh" />
        </div>
      </div>
      <div class="flex-1">
        <NDataTable
          v-bind="$attrs"
          :scroll-x="computedScrollX"
          remote
          :loading="loading"
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :row-class-name="rowClassName"
          :checked-row-keys="checkedKeys"
          :size="size"
          :row-key="props.rowKey"
          :default-expanded-row-keys="defaultExpandedRowKeys"
          @update:sorter="handleSorterChange"
          @update:checked-row-keys="handleCheck"
        />
      </div>
    </div>
  </NEl>
</template>
