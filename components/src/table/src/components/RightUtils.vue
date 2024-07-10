<script setup lang="ts">
import { toRef, useFullscreen } from '@vueuse/core'
import { type DataTableProps, NPopselect } from 'naive-ui'
import { computed } from 'vue'
import type { RightUtils } from '../type'
import { AtIconMsg } from '../../../icon-message'
import { AtIcon } from '../../../icon'
import ColumnSetting from './ColumnSetting.vue'

const props = defineProps<{
  options: RightUtils
  wrapper?: HTMLDivElement
  reload: (keepPage?: boolean) => void
}>()

const size = defineModel<DataTableProps['size']>('size')

type Utils = Record<
    RightUtils[number],
    {
      tip: string
      key: RightUtils[number]
      icon: string
    }
>
const wrapper = toRef(() => props.wrapper)
const { isFullscreen, toggle } = useFullscreen(wrapper)

const UTILS = computed<Utils>(() => ({
  size: {
    tip: '尺寸',
    key: 'size',
    icon: 'svg-column-height',
  },
  fullscreen: {
    tip: isFullscreen.value ? '取消全屏' : '全屏',
    key: 'fullscreen',
    icon: isFullscreen.value ? 'svg-fullscreen-exit' : 'svg-fullscreen',
  },
  reload: {
    tip: '刷新',
    key: 'reload',
    icon: 'svg-reload',
  },
  setting: {
    tip: '设置',
    key: 'setting',
    icon: 'svg-setting',
  },
}))

const data = computed(() => {
  return props.options.map((key) => {
    return UTILS.value[key]
  })
})

function handleClick(key: RightUtils[number]) {
  switch (key) {
    case 'fullscreen':
      toggle()
      break
    case 'reload':
      props.reload()
      break
  }
}

// "small" | "medium" | "large" | undefined
const sizeOptions = [
  {
    label: '更小',
    value: 'small',
  },
  {
    label: '不大',
    value: 'medium',
  },
  {
    label: '更大',
    value: 'large',
  },
]
</script>

<template>
  <div flex="~ items-center gap4">
    <!-- <AtIcon v-for="item in data" :key="item.key" :icon="item.icon" /> -->
    <AtIconMsg v-for="item in data" :key="item.key" :message="item.tip">
      <template #trigger>
        <NPopselect v-if="item.key === 'size'" v-model:value="size" :options="sizeOptions" trigger="click">
          <AtIcon size="18px" :icon="item.icon" class="cursor-pointer outline-none" />
        </NPopselect>
        <ColumnSetting v-else-if="item.key === 'setting'" :wrapper="wrapper">
          <AtIcon size="18px" :icon="item.icon" class="cursor-pointer outline-none" />
        </ColumnSetting>
        <AtIcon v-else size="18px" :icon="item.icon" class="cursor-pointer outline-none" @click="handleClick(item.key)" />
      </template>
    </AtIconMsg>
  </div>
</template>
