<script setup lang="ts">
import { NSpin } from 'naive-ui'
import type { AtLoadingProps } from './types'

defineOptions({
  name: 'AtLoading',
})

withDefaults(defineProps<AtLoadingProps>(), { minHeight: '200px' })
</script>

<template>
  <div v-if="show" class="h-full w-full flex items-center justify-center" :style="{ minHeight }">
    <NSpin v-bind="$attrs" />
  </div>
</template>
