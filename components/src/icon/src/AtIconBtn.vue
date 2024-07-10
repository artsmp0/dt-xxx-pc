<script setup lang="ts">
import { NButton } from 'naive-ui'
import AtIcon from './AtIcon.vue'
import type { AtIconButtonProps } from './types'

defineOptions({
  name: 'AtIconBtn',
})
const props = defineProps<AtIconButtonProps>()
</script>

<template>
  <NButton v-bind="props">
    <template v-if="props.icon" #icon>
      <AtIcon :icon="props.icon" v-bind="props.atIconProps" />
    </template>
    <slot />
  </NButton>
</template>
