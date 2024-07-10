import { computed, provide, ref, shallowRef, toValue, watch } from 'vue'
import { type AtTableProps, type TableColumns, tableInjectionKey } from '../type'

export default function useColumns(propsGetter: () => AtTableProps) {
  const props = toValue(propsGetter)
  const cols = shallowRef<TableColumns<any>>([])
  watch(
    () => props.columns,
    () => {
      cols.value = [...props.columns]
    },
    { immediate: true },
  )
  const originalColumns = computed(() => {
    const columns = cols.value.map((col) => {
      return { ...col, rowSpan: col.needRowSpan ? (rowData: any) => rowData[`${col.key as string}RowSpan`] : undefined }
    })
    if (props.selection)
      columns.unshift({ title: '选择列', key: 'selection', ...props.selection } as any)

    return columns as any
  })

  const usedColumns = ref([...originalColumns.value])
  watch(originalColumns, () => {
    usedColumns.value = [...originalColumns.value]
  })
  provide(tableInjectionKey, { usedColumns, originalColumns })

  return {
    columns: usedColumns,
  }
}
