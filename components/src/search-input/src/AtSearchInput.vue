<script setup lang="ts">
import { type InputProps, NInput, NInputGroup } from 'naive-ui'
import { ref, useAttrs } from 'vue'
import { AtIcon, AtIconBtn } from '../../icon'

defineOptions({
  name: 'AtSearchInput',
})

const props = withDefaults(
  defineProps<Props>(),
  { placeholder: '按回车搜索', showBtn: true },
)
const emit = defineEmits<{
  search: [string]
}>()
interface Props extends /* @vue-ignore */ InputProps {
  showBtn?: boolean
}

const value = ref('')

function handleSearch(clear = false) {
  if (clear)
    value.value = ''
  emit('search', value.value)
}

const attrs: any = useAttrs()
</script>

<template>
  <NInputGroup>
    <NInput v-bind="{ ...attrs, ...props }" v-model:value="value" clearable @keydown.enter="handleSearch()" @clear="handleSearch(true)">
      <template #prefix>
        <AtIcon icon="i-ph-magnifying-glass-duotone" />
      </template>
    </NInput>
    <AtIconBtn v-if="props.showBtn" :size="attrs.size" ghost icon="i-ph-magnifying-glass-duotone" @click="handleSearch()" />
  </NInputGroup>
</template>
