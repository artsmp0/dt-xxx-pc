<script setup lang="ts">
import type { PageHeaderProps } from 'naive-ui'
import { NPageHeader } from 'naive-ui'
import { useAttrs } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AtPageHeader',
})

const props = defineProps<Props>()

interface Props extends /* @vue-ignore */ PageHeaderProps {}

const router = useRouter()
function handleBack() {
  if (props.onBack)
    return props.onBack()
  router.back()
}

const attrs = useAttrs()
</script>

<template>
  <NPageHeader class="mb4 shrink-0" v-bind="attrs" @back="handleBack">
    <template #title>
      <slot>{{ attrs.title }}</slot>
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
  </NPageHeader>
</template>
