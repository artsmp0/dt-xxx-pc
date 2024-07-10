<script lang="ts" setup>
import { type CSSProperties, computed } from 'vue'

defineOptions({
  name: 'AtSvgIcon',
})

const props = withDefaults(defineProps<Props>(), {
  color: 'currentColor',
  size: '1em',
  spin: false,
})

interface Props {
  /** icons 文件夹下的图标名称 */
  name: string
  /**
   * 图标尺寸
   * @default 1em
   */
  size?: string
}

const symbolId = computed(() => `#icon-${props.name}`)
const style = computed((): CSSProperties => {
  return {
    width: `${props.size}`,
    height: `${props.size}`,
  }
})
</script>

<template>
  <svg aria-hidden="true" class="at-icon" :style="style">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped>
.at-icon {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentcolor;
}
</style>
