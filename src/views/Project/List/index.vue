<script setup lang="tsx">
import type { AtTableInst, TableColumns } from '@gupo-admin/components'
import { AtConfirm, AtIconBtn, useTableListApi } from '@gupo-admin/components'
import { NButton, NFlex } from 'naive-ui'
import { BACKEND_API } from '@/api'

defineOptions({ name: '/Project/List' })

const tableRef = shallowRef<AtTableInst>()
const router = useRouter()
const { getList } = useTableListApi(BACKEND_API.testList)
const columns: TableColumns<any> = [
  { key: '1', title: '项目名称', render(rowData) {
    return (
      <AtIconBtn
        icon="i-ph-pen"
        onClick={() => {
          router.push({ path: '/project/list/detail', query: { id: rowData['1'] } })
        }}
      >
        {rowData['1']}
      </AtIconBtn>
    )
  } },
  { key: 'operation', title: '操作', fixed: 'right', width: 180, render() {
    return (
      <NFlex align="center">
        <NButton text type="primary" onClick={() => {}}>编辑</NButton>
        <AtConfirm
          message="删除后无法恢复，是否需要删除？"
          onConfirm={async () => {
            // const res = await APIS.backend[BACKEND_URLS.stdVersionDel]({ standard_id: rowData.standard_id })
            // if (res.err || !res.data.data)
            //   return
            // message.success('删除成功！')
            // tableRef.value?.refresh()
          }}
          buttonProps={{ type: 'error', text: true }}
        >
          删除
        </AtConfirm>
      </NFlex>
    )
  } },
]

function onSearch(keyword: string) {
  tableRef.value?.filter({ keyword })
}
</script>

<template>
  <AtPageContainer inner-scroll>
    <AtTable ref="tableRef" class="h-full" flex-height :list-api="getList" :columns="columns">
      <template #extra>
        <NSpace>
          <AtSearchInput placeholder="按回车搜索" size="small" @search="onSearch" />
          <AtIconBtn size="small" type="primary" icon="i-ph-plus">
            新建
          </AtIconBtn>
        </NSpace>
      </template>
    </AtTable>
  </AtPageContainer>
</template>
