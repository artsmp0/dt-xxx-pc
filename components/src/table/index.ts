import AtTable from './src/AtTable.vue'

export { default as useTableListApi } from './src/hooks/use-list-api'
export type { TableColumns } from './src/type'
export type AtTableInst = InstanceType<typeof AtTable>
export { AtTable }
