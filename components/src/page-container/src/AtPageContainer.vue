<script setup lang="ts">
import { NBackTop, NScrollbar } from 'naive-ui'
import { computed, onMounted, ref, shallowRef } from 'vue'

defineOptions({
  name: 'AtPageContainer',
})

const props = withDefaults(
  defineProps<{
    innerScroll?: boolean
    padding?: number | string
    xScrollable?: boolean
    backTop?: boolean
  }>(),
  { padding: '16px' },
)
const pdTop = ref(props.padding)
const style = computed(() => ({
  padding: `${Number.parseInt(props.padding as string)}px`,
  paddingTop: `${Number.parseInt(pdTop.value as string)}px`,
}))

const $wrapper = shallowRef<HTMLElement>()

// 有面包屑，不需要 paddingTop
onMounted(() => {
  const breadcrumbEl = $wrapper.value?.parentElement?.parentElement?.previousElementSibling
  if (breadcrumbEl && breadcrumbEl.classList.contains('at-breadcrumb')) {
    pdTop.value = '0'
  }
})
</script>

<template>
  <div ref="$wrapper" class="h-full w-full" :class="[innerScroll ? 'flex flex-col of-hidden' : 'of-auto']" :style="innerScroll ? style : undefined">
    <NScrollbar v-if="!innerScroll" :x-scrollable="xScrollable">
      <div :style>
        <slot />
      </div>
      <NBackTop v-if="backTop" class="z-1000" right="40" :to="$wrapper" />
    </NScrollbar>
    <slot v-else />
  </div>
</template>
