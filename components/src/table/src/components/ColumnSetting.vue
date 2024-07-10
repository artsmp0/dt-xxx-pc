<script setup lang="ts">
import { cloneDeep } from 'lodash-unified'
import { NButton, NCheckbox, NCheckboxGroup, NPopover } from 'naive-ui'
import sortablejs from 'sortablejs'
import type { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'
import type Sortable from 'sortablejs'
import { computed, inject, nextTick, reactive, ref, shallowRef, unref, watch } from 'vue'
import { tableInjectionKey } from '../type'

defineProps<{
  wrapper?: HTMLDivElement
}>()

const injectData = inject(tableInjectionKey)
const originalColumns = computed(() => {
  if (injectData?.originalColumns)
    return injectData.originalColumns.value as TableBaseColumn[]

  return [] as TableBaseColumn[]
})

const defaultCheckedList = injectData!.usedColumns.value.map((col: any) => col.key)
const defaultState = {
  indeterminate: false, // 未全选显示
  checkAll: true,
  checkedList: defaultCheckedList,
}
// ========= 显示和不显示的逻辑 =========
const state = reactive(cloneDeep(defaultState))
const sortColumns = shallowRef(cloneDeep(originalColumns.value)) // 用于排序
let sortIns: Sortable
let defaultSortOrder: string[] = []
watch(
  () => state.checkedList,
  (v) => {
    if (!injectData?.usedColumns || !sortColumns.value)
      return
    state.indeterminate = v.length > 0 && v.length < sortColumns.value.length
    state.checkAll = v.length === sortColumns.value.length
    // 使用排序列的顺序更新表格列的数据，以获得正确的显示
    injectData.usedColumns.value = sortColumns.value.filter(col => v.includes(col.key as string))
  },
)
function onCheckAllChange(checked: boolean) {
  state.checkedList = checked ? originalColumns.value?.map(opt => opt.key as string) || [] : []
}
async function onReset() {
  Object.assign(state, cloneDeep(defaultState))
  sortIns.sort(defaultSortOrder)
  // 也会触发watch ，这边的处理要慢于watch
  await nextTick()
  if (injectData?.usedColumns && originalColumns.value) {
    // 重置后记得更新排序列的顺序
    sortColumns.value = injectData.usedColumns.value = [...originalColumns.value]
  }
}

// ========= 排序逻辑 =========
const $sortableWrapper = ref<InstanceType<typeof NCheckboxGroup>>()
async function handleVisibleChange() {
  await nextTick()
  const wrapper = unref($sortableWrapper)
  if (!wrapper)
    return
  const el = wrapper.$el
  if (!el)
    return
  sortIns = sortablejs.create(el, {
    animation: 500,
    delay: 400,
    delayOnTouchOnly: true,
    handle: '.column-setting__item',
    scroll: true,
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt
      if (!injectData || !sortColumns.value)
        return
      // 一定要用排序的列，因为data.columns.value是过滤后的列
      const columns = sortColumns.value.slice() || []
      if (oldIndex == null || newIndex == null || oldIndex === newIndex)
        return

      if (oldIndex > newIndex) {
        columns.splice(newIndex, 0, columns?.[oldIndex])
        columns.splice(oldIndex + 1, 1)
      }
      else {
        columns.splice(newIndex + 1, 0, columns?.[oldIndex])
        columns.splice(oldIndex, 1)
      }
      // 排序结束记得更新原始列的顺序
      injectData.usedColumns.value = columns.filter(col => state.checkedList.includes(col.key))
      sortColumns.value = columns
    },
  })
  defaultSortOrder = cloneDeep(sortIns.toArray())
}
</script>

<template>
  <div class="flex items-center justify-center">
    <NPopover trigger="click" placement="bottom" @update:show="handleVisibleChange">
      <template #trigger>
        <slot />
      </template>
      <template #header>
        <div class="flex items-center justify-between">
          <NCheckbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate" @update:checked="onCheckAllChange">
            列展示
          </NCheckbox>
          <NButton text @click="onReset">
            重置
          </NButton>
        </div>
      </template>
      <NCheckboxGroup ref="$sortableWrapper" v-model:value="state.checkedList" class="max-h-200px max-w-166px of-auto">
        <div v-for="col in originalColumns" :key="col.key" class="column-setting__item p1">
          <NCheckbox :value="col.key">
            <component :is="col.title" v-if="typeof col.title === 'function'" :key="col.key" />
            <span v-else>{{ col.title }}</span>
          </NCheckbox>
        </div>
      </NCheckboxGroup>
    </NPopover>
  </div>
</template>

<style lang="scss" scoped>
.column-setting__item {
    .n-checkbox {
        width: 100%;

        :deep(.n-checkbox__label) {
            width: 100%;
            padding-right: 0;
            padding-left: 16px;
            cursor: move;
        }
    }
}
</style>
