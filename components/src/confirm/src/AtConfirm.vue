<script setup lang="ts">
import { NButton, NFlex, NPopconfirm } from 'naive-ui'
import { computed, ref } from 'vue'
import { AtIconBtn } from '../../icon'
import type { AtConfirmProps } from './types'

defineOptions({
  name: 'AtConfirm',
})

const props = withDefaults(
  defineProps<AtConfirmProps>(),
  {
    buttonProps: () => ({ type: 'error', secondary: true, size: 'tiny' }),
  },
)

const confirmProps = computed(() => props.confirmProps)

const show = ref(false)
const loading = ref(false)
function handleCancel() {
  show.value = false
}
async function handlePositiveClick() {
  try {
    loading.value = true
    await props.onConfirm?.()
  }
  finally {
    loading.value = false
    handleCancel()
  }
}
</script>

<template>
  <NPopconfirm v-bind="props.confirmProps" v-model:show="show">
    <template #trigger>
      <AtIconBtn v-bind="buttonProps" @click.stop="">
        <slot />
      </AtIconBtn>
    </template>
    {{ message }}
    <template #action>
      <NFlex align="center" size="small">
        <NButton size="tiny" v-bind="confirmProps?.negativeButtonProps" @click="handleCancel">
          {{ confirmProps?.negativeText || '取消' }}
        </NButton>
        <NButton type="primary" size="tiny" :loading="loading" v-bind="confirmProps?.positiveButtonProps" @click="handlePositiveClick">
          {{ confirmProps?.positiveText || '确认' }}
        </NButton>
      </NFlex>
    </template>
  </NPopconfirm>
</template>
