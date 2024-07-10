import type { DataTableBaseColumn, DataTableColumns, DataTableProps } from 'naive-ui'
import type { TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { ComputedRef, InjectionKey, ShallowRef } from 'vue'

/** 分页参数 */
export interface PagerKeys {
  page?: string
  pageSize?: string
  total?: string
  list?: string
}

// { field: { orderField: 'isAsc', sortField: 'orderByColumn' }, order: { ascend: 'asc', descend: 'desc' } }
/** 排序参数 */
export interface SorterKeys {
  field: { sortField: string, orderField: string }
  order: { ascend: string, descend: string }
}

export type RightUtils = ('size' | 'fullscreen' | 'reload' | 'setting')[]

export type TableColumns<T = any> = (Omit<DataTableBaseColumn<T>, 'key'> & {
  key: keyof T | 'operation'
  fitContent?: boolean
  needRowSpan?: boolean
})[]

export interface AtTableProps {
  listApi: (...params: any[]) => Promise<any>
  /** 分页相关数据获取的路径字符串或者参数名称 */
  pagerKeys?: PagerKeys
  pagination?: DataTableProps['pagination']
  columns: TableColumns
  sorterKeys?: SorterKeys
  selection?: TableSelectionColumn
  /** 右侧功能区 */
  rightUtils?: RightUtils
  size?: DataTableProps['size']
  /** 对 data 是否采用 ref 包裹还是 shallowRef，一般如果不需要行内编辑，shallowRef 即可，不用深度侦听对象，明显性能会好一些 */
  deepReactive?: boolean
  /** 自动处理异步数据展开 */
  defaultExpandAll?: boolean
  rowKey?: DataTableProps['rowKey']
  /** 是否自动调取接口获取数据 */
  autoFetch?: boolean
  /** 表格头部类名 */
  headerCls?: string
  /** 开启自适应列宽(有一列存在 fitContent)后，该属性由内部计算，注意：此时非自适应列宽的 column 的 width 必须存在 */
  scrollX?: number
  /** 表格外边框 @default true */
  outerBordered?: boolean
  tableTitle?: string
  rowClassName?: DataTableProps['rowClassName']
}

export const tableInjectionKey = Symbol('table') as InjectionKey<{
  usedColumns: ShallowRef<DataTableColumns>
  originalColumns: ComputedRef<DataTableColumns>
}>
