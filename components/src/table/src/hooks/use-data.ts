/* eslint-disable ts/no-use-before-define */
import type { DataTableSortState } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { type Ref, computed, h, nextTick, reactive, ref, render, shallowRef, toValue } from 'vue'
import type { AtTableProps } from '../type'

interface UseData {
  propsGetter: () => AtTableProps
  updateCheckedRows: () => void
  columns: Ref<AtTableProps['columns']>
}

function resolveArg(result: any, path: string) {
  return path.split('.').reduce((res, cur) => {
    return res?.[cur]
  }, result)
}

const CELL_PADDING = 24

/**
 * 计算行合并的数据
 * @param data 行合并的数据源
 * @param key 对应的key
 */
function rowSpan(data: any[], key: string) {
  const arr = data
    .reduce((result, item) => {
      if (!result.includes(item[key]))
        result.push(item[key])

      return result
    }, [])
    .reduce((result: any[], keys: any) => {
      const children = data.filter(item => item[key] === keys)
      result = result.concat(
        children.map((item, index) => ({
          ...item,
          [`${key}RowSpan`]: index === 0 ? children.length : 0,
        })),
      )
      return result
    }, [])
  return arr
}

export default function useData({ propsGetter, updateCheckedRows, columns }: UseData) {
  const props = toValue(propsGetter)
  const pagerKeys = computed(() => {
    const defaultPagerKeys = {
      total: 'data.meta.total',
      page: 'page',
      pageSize: 'size',
      list: 'data.data',
    }
    return Object.assign(defaultPagerKeys, props.pagerKeys)
  })
  const pagination = reactive({
    page: 1,
    pageSize: 20,
    showSizePicker: true,
    showQuickJumper: true,
    pageSlot: 5,
    pageSizes: [10, 20, 50, 100],
    itemCount: 0,
    prefix({ itemCount }: any) {
      return `总条数：${itemCount}`
    },
    // ! 为什么要 as any，为了不让 ts 计算这里：
    // The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
    ...(props.pagination as any),
    onChange: (page: number) => {
      pagination.page = page
      getData()
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.page = 1
      getData()
    },
  })
  const hasFitContentCol = computed(() => {
    return columns.value.some(col => col.fitContent)
  })
  const computedScrollX = ref(props.scrollX ?? (hasFitContentCol.value ? 0 : undefined))
  const data = props.deepReactive ? ref<RowData[]>([]) : shallowRef<RowData[]>([])
  const loading = ref(false)
  const fitColKeys = computed(() => columns.value.filter(col => col.fitContent).map(col => col.key))
  /** 缓存当前列表的筛选参数 */
  const cachedParams = ref<any>({})

  const getWidth = (el: HTMLDivElement, node: any) => {
    if (typeof node === 'string' || typeof node === 'number')
      node = h('span', node)
    render(node, el)
    const w = el.offsetWidth
    return w
  }
  /** 自适应列宽计算 */
  const calcColWidthAndScrollX = async () => {
    const el = document.createElement('div')
    el.style.width = 'fit-content'
    el.style.visibility = 'hidden'
    el.style.opacity = '0'
    el.style.whiteSpace = 'nowrap'
    el.style.fontSize = '14px'
    el.style.fontWeight = 'bold'
    el.style.padding = '0 12px'
    document.body.append(el)
    // 动态计算 fitColKeys 的列宽
    for (const k in fitColKeys.value) {
      const key = fitColKeys.value[k]
      const col = columns.value.find(col => col.key === key)!
      if (col.fitContent) {
        col.width
                = getWidth(
            el,
            typeof col.title === 'function' ? col.title(col as any) : h('span', { style: { whiteSpace: 'nowrap' } }, col.title as string),
          ) + CELL_PADDING
        if (col.filter || col.sorter)
          col.width += 40

        data.value.forEach((row, idx) => {
          if (row[key as string] === undefined)
            return
          const renderRes = col.render?.(row, idx) ?? h('span', { style: { whiteSpace: 'nowrap' } }, `${row[key as string]}`)
          const wid = renderRes ? getWidth(el, renderRes) : 0
          col.width = Math.max((col.width ?? CELL_PADDING) as number, wid + CELL_PADDING)
        })
      }
    }
    computedScrollX.value = columns.value.reduce((cur, next) => {
      if (next.type === 'selection')
        return cur + 40
      return cur + (next.width as number)
    }, 0)
    el.remove()
  }
  const getRowSpanKey = (): string[] => {
    return columns.value.filter(col => col.needRowSpan).map(col => col.key as string) || ([] as string[])
  }
  const rowSpanKey = getRowSpanKey()
  /** 获取数据和筛选数据 */
  const getData = async (params?: any, withOldParams = true) => {
    // 过滤调用重置分页
    if (params)
      pagination.page = 1

    if (withOldParams) {
      cachedParams.value = {
        ...cachedParams.value,
        ...params,
      }
    }
    else {
      cachedParams.value = params
    }
    try {
      loading.value = true
      const { data: apiData, err } = await props.listApi({
        [pagerKeys.value.pageSize]: pagination.pageSize,
        [pagerKeys.value.page]: pagination.page,
        ...cachedParams.value,
      })
      if (err) {
        if (err.code === 'ERR_CANCELED') {
          loading.value = true
          return
        }
        loading.value = false
        return
      }
      else {
        loading.value = false
      }
      data.value = resolveArg(apiData, pagerKeys.value.list) ?? []
      if (rowSpanKey.length > 0) {
        rowSpanKey.forEach((key) => {
          data.value = rowSpan(data.value, key)
        })
      }
      await nextTick()
      hasFitContentCol.value && calcColWidthAndScrollX()
      pagination.itemCount = resolveArg(apiData, pagerKeys.value.total)
      updateCheckedRows()
    }
    catch (error) {
      console.warn(error)
    }
  }
  props.autoFetch && getData()
  /** 刷新列表 */
  const refresh = async (keepPage = true) => {
    if (!keepPage)
      pagination.page = 1

    await getData()
  }
  /** 处理后端多列排序的逻辑 */
  const handleSorterChange = (sorter: DataTableSortState | DataTableSortState[] | null) => {
    if (!props.sorterKeys) {
      console.warn('未传递 sorterKeys props，无法进行远程排序！若本地排序请直接使用 naive ui 自带的表格组件！')
      return
    }
    let sorterParams: any
    const sortField = props.sorterKeys.field.sortField
    const orderField = props.sorterKeys.field.orderField
    const ascend = props.sorterKeys.order.ascend
    const descend = props.sorterKeys.order.descend
    if (Array.isArray(sorter)) {
      sorterParams = sorter
        .sort((a, b) => (a.sorter as any).multiple - (b.sorter as any).multiple)
        .reduce(
          (res, cur) => {
            return cur.order
              ? {
                  [sortField]: [cur.columnKey, ...res[sortField]],
                  [orderField]: [cur.order === 'ascend' ? ascend : descend, ...res[orderField]],
                }
              : res
          },
          {
            [sortField]: [],
            [orderField]: [],
          } as any,
        )
      sorterParams[sortField] = sorterParams[sortField].join(',')
      sorterParams[orderField] = sorterParams[orderField].join(',')
    }
    else {
      sorterParams = {
        [sortField]: sorter?.columnKey,
        [orderField]: sorter?.order === 'ascend' ? ascend : descend,
      }
    }

    cachedParams.value = {
      ...cachedParams.value,
      ...sorterParams,
    }
    getData()
  }

  return {
    loading,
    data,
    pagination: props.pagination === false ? false : pagination,
    computedScrollX,
    refresh,
    filter: getData,
    handleSorterChange,
  }
}
