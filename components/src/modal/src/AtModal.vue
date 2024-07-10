<!-- eslint-disable unicorn/prefer-query-selector -->
<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { uniqueId } from 'lodash-unified'
import { NEl, NModal, NScrollbar, type ScrollbarInst } from 'naive-ui'
import { computed, nextTick, reactive, shallowRef, unref, watch } from 'vue'
import type { GpModalProps } from './types'
import startDrag from './drag'

defineOptions({
  name: 'AtModal',
})

const props = withDefaults(defineProps<GpModalProps>(), {
  width: '800px',
  showAction: true,
  confirmLabel: '确认',
  confirmType: 'primary',
  cancelLabel: '取消',
  draggable: false,
  fullscreen: true,
  defaultFullscreen: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const modalRef = shallowRef()
const modalContainerRef = computed(() => unref(modalRef)?.containerRef)

const modalId = uniqueId('at-modal-')
const modalBarId = uniqueId('at-modal-bar-')

const [show, toggleShow] = useToggle()
const [isFullscreen, toggleFullscreen] = useToggle(props.defaultFullscreen)

watch(isFullscreen, (val: boolean) => {
  if (!val || !props.draggable)
    return
  const oBox: any = document.getElementById(modalId)
  if (oBox.style) {
    oBox.style.top = 0
    oBox.style.left = 0
  }
})

const modalClass = computed(() => (unref(isFullscreen) ? null : '!mt-10vh'))
const modalStyle = computed(() => {
  return {
    width: unref(isFullscreen) ? '100vw' : props.width,
    height: unref(isFullscreen) ? '100vh' : 'auto',
  }
})

const modalHeaderHeight = computed(() => unref(modalContainerRef)?.querySelector('.n-card-header')?.offsetHeight || 0)
const modalActionHeight = computed(() => unref(modalContainerRef)?.querySelector('.n-card__action')?.offsetHeight || 0)
const scrollBarMaxHeight = computed(
  () => `calc(${unref(isFullscreen) ? '100vh' : '80vh'} - ${unref(modalHeaderHeight)}px - ${props.showAction ? `${unref(modalActionHeight)}px` : '0px'})`,
)
/** 用于外部获取内容可视区高度 */
const contentMaxHeight = computed(
  () =>
        `calc(${unref(isFullscreen) ? '100vh' : '80vh'} - ${unref(modalHeaderHeight)}px - ${props.showAction ? `${unref(modalActionHeight)}px` : '0px'} - 32px)`,
)
async function open() {
  toggleShow(true)
  await nextTick()
}

function close() {
  toggleShow(false)
}

function handleUpdateShow(show: boolean) {
  if (!show) {
    if (props.onBeforeClose) {
      const shouldClose = props.onBeforeClose?.()
      if (shouldClose) {
        toggleShow()
        emit('cancel')
      }
    }
    else {
      toggleShow()
      emit('cancel')
    }
  }
}

function handleAfterEnter() {
  if (!props.draggable)
    return
  const oBox = document.getElementById(modalId)
  const oBar = document.getElementById(modalBarId)
  if (!oBox || !oBar) {
    console.warn('not found modal')
    return
  }
  startDrag(oBar, { target: oBox })
}

const scrollRef = shallowRef<ScrollbarInst>()

defineExpose(
  reactive({
    open,
    close,
    contentMaxHeight,
    scrollRef,
  }),
)
</script>

<template>
  <NModal
    :id="modalId"
    ref="modalRef"
    :auto-focus="true"
    :show="show"
    preset="card"
    size="medium"
    v-bind="$attrs"
    :segmented="{
      content: true,
      action: true,
    }"
    :content-style="{
      padding: '0',
    }"
    :class="modalClass"
    :style="modalStyle"
    @update:show="handleUpdateShow"
    @after-enter="handleAfterEnter"
  >
    <template #header>
      <slot name="header">
        <div :id="modalBarId" :class="{ 'cursor-move': draggable }" class="w-full">
          {{ title }}
        </div>
      </slot>
    </template>
    <template #header-extra>
      <div v-if="fullscreen" class="n-base-close n-base-close--absolute n-card-header__close !mr-8px" @click="toggleFullscreen()">
        <div :class="isFullscreen ? 'i-ant-design-compress-outlined' : 'i-ant-design-expand-outlined'" />
      </div>
    </template>
    <NEl>
      <!-- 用于在模态框内定位元素: 例如滚动时固定某个元素 -->
      <NScrollbar ref="scrollRef" class="translate-0" :style="{ padding: 0, maxHeight: scrollBarMaxHeight }">
        <div class="p4" :class="props.contentCls">
          <slot />
        </div>
      </NScrollbar>
    </NEl>
    <template v-if="showAction" #action>
      <slot name="action">
        <NSpace justify="end">
          <NButton
            @click="
              close();
              emit('cancel');
            "
          >
            取消
          </NButton>
          <NButton type="primary" :loading="props.confirmLoading" @click="emit('confirm')">
            确认
          </NButton>
        </NSpace>
      </slot>
    </template>
  </NModal>
</template>
