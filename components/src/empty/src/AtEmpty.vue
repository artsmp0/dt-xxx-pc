<script setup lang="ts">
import { NEmpty } from 'naive-ui'
import { AtIcon } from '../../icon'
import type { AtEmptyProps } from './types'

defineOptions({
  name: 'AtEmpty',
  inheritAttrs: false,
})

withDefaults(
  defineProps<AtEmptyProps>(),
  {
    description: '暂无数据',
  },
)
</script>

<template>
  <div :style="{ height }" class="h-full w-full flex items-center justify-center">
    <NEmpty v-bind="$attrs">
      <template #icon>
        <slot name="icon">
          <AtIcon icon="svg-empty-box" />
        </slot>
      </template>
    </NEmpty>
  </div>
</template>
