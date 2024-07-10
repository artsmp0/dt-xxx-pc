<script setup lang="tsx">
import { BACKEND_API } from '@/api'

defineOptions({ name: '/Overview' })

// @ts-expect-error no use
// eslint-disable-next-line unused-imports/no-unused-vars
async function testApi() {
  const res = await BACKEND_API.pathParamTest({ name: 'artsmp' }, undefined, { age: 18, id: 1 })
  // eslint-disable-next-line no-console
  console.log('res: ', res)
}
</script>

<template>
  <AtPageContainer inner-scroll>
    <div class="h-full f-center bg-base p2">
      <AtIconBtn tag="a" type="primary" ghost target="_blank" href="https://demo.group-ds.com/dev-business-kits-docs/">
        看看文档吧
      </AtIconBtn>
    </div>
  </AtPageContainer>
</template>
