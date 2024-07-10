<script setup lang="ts">
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { AtIcon } from '@gupo-admin/components'
import { type Tab, useTabsStore } from '@/stores/tabs'
import { useUIStore } from '@/stores/ui'
import { useAtTheme } from '@/composables/theme'

const { derivedColors, themeVars } = useAtTheme()
const router = useRouter()
const route = useRoute()
const tabStore = useTabsStore()
const UI = useUIStore()
const tabPos = computed<'alone' | 'top' | 'hidden'>(() => UI.defaultSetting.TAB_POSITION)
const $tabBar = shallowRef<HTMLDivElement>()
const scrollbarContainer = shallowRef<HTMLDivElement | null>()
const $scrollbar = shallowRef()
const canCenterActivation = ref(true)
function tryCenterActivation() {
  if (!canCenterActivation.value) {
    const timer = setTimeout(() => {
      // 时间要和动画时间保持一致
      clearTimeout(timer)
      tryCenterActivation()
    }, 300)
    return
  }
  const tabBarWidth = $tabBar.value!.offsetWidth
  const targetEl = document.querySelector(`[data-path="${route.path}"]`) as HTMLDivElement
  // 尽力滚动到容器中央
  const left = targetEl.offsetLeft + targetEl.offsetWidth / 2 - tabBarWidth / 2
  $scrollbar.value.scrollTo({ left, behavior: 'smooth' })
}
watch(
  route,
  async () => {
    tabStore.resolveHistory(route.path)
    tabStore.addTab(route)
    await nextTick()
    if (route.meta.hideInMenu)
      return
    tryCenterActivation()
  },
  { immediate: true },
)
function handleClick(t: Tab) {
  tabStore.resolveHistory(t.path)
  router.push({
    path: t.path,
  })
  tabStore.resolveHistory(t.path)
}
function handleClose(t: Tab) {
  if (!tabStore.removeTab(t))
    return
  tabStore.resolveHistory(t.path, true)
  if (t.path === route.path) {
    if (tabStore.accessHistory.size === 0)
      return
    const newPath = [...tabStore.accessHistory].at(-1)
    if (newPath) {
      router.push({
        path: newPath,
      })
    }
  }
}
// 右键菜单
const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)
const curRightClickTab = shallowRef<Tab>()
function handleShowContextMenu(e: MouseEvent, t: Tab) {
  showDropdown.value = false
  curRightClickTab.value = t
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}
const options = [
  {
    label: '关闭',
    key: 'close',
  },
  {
    label: '关闭其他',
    key: 'closeOther',
  },
  {
    label: '关闭所有',
    key: 'closeAll',
  },
  {
    label: '关闭右侧',
    key: 'closeRight',
  },
  {
    label: '关闭左侧',
    key: 'closeLeft',
  },
]
function onClickOutside(e: MouseEvent) {
  if (e.button === 0)
    showDropdown.value = false
}
function handleSelect(key: string | number) {
  showDropdown.value = false
  if (!curRightClickTab.value)
    return
  const t = curRightClickTab.value
  let delTabs: Tab[] = []
  switch (key) {
    case 'close':
      handleClose(t)
      break
    case 'closeOther':
      if (t.path === route.path) {
        tabStore.removeOther(t)
      }
      else {
        router.push(t.path)
        tabStore.removeOther(t)
      }
      break
    case 'closeAll':
      router.push('/')
      tabStore.removeAll()
      break
    case 'closeLeft':
      delTabs = tabStore.removeLeft(t)
      if (delTabs.some(t => t.path === route.path))
        router.push(t.path)

      delTabs = []
      break
    case 'closeRight':
      delTabs = tabStore.removeRight(t)
      if (delTabs.some(t => t.path === route.path))
        router.push(t.path)

      delTabs = []
      break
    default:
      break
  }
  curRightClickTab.value = undefined
}

// 阴影遮罩
const scrollable = ref(false)
const showScrollShadowStart = ref(false)
const showScrollShadowEnd = ref(false)
function updateScrollable() {
  scrollable.value = scrollbarContainer.value!.scrollWidth > scrollbarContainer.value!.clientWidth
}
watch(
  () => tabStore.openTabs.size,
  () => {
    updateScrollable()
    if (!scrollable.value) {
      showScrollShadowStart.value = false
      showScrollShadowEnd.value = false
    }
  },
)
const handleScroll = useDebounceFn((e: Event) => {
  updateScrollable()
  if (!scrollable.value) {
    showScrollShadowStart.value = false
    showScrollShadowEnd.value = false
    return
  }
  const left = (e.target as Element).scrollLeft
  const right = (e.target as Element).scrollWidth - (e.target as Element).clientWidth
  if (right > 0)
    showScrollShadowEnd.value = true

  if (Math.abs(right - left) < 1)
    showScrollShadowEnd.value = false

  if (left > 0)
    showScrollShadowStart.value = true
  else
    showScrollShadowStart.value = false
}, 60)

const tabbarCls = computed(() => {
  return `tabbar shrink-0 ${tabPos.value === 'alone' ? 'bd-base-b' : 'h-full'}
     ${showScrollShadowStart.value ? 'scroll-shadow__start' : ''} 
     ${showScrollShadowEnd.value ? 'scroll-shadow__end' : ''}`
})

// 支持滚轮滚动
useEventListener(
  $tabBar,
  'wheel',
  (e) => {
    $scrollbar.value.scrollTo({ left: scrollbarContainer.value!.scrollLeft + e.deltaY })
  },
  { passive: true },
)
onMounted(() => {
  scrollbarContainer.value = $tabBar.value!.querySelector('.n-scrollbar-container') as HTMLDivElement
  updateScrollable()
  showScrollShadowEnd.value = scrollable.value
})
</script>

<template>
  <div v-if="tabStore.accessHistory.size > 0" ref="$tabBar" :class="tabbarCls">
    <NScrollbar ref="$scrollbar" :x-scrollable="true" @scroll="handleScroll">
      <TransitionGroup
        name="list"
        class="relative flex ws-nowrap px2 py2"
        :class="[tabPos === 'alone' ? '' : 'tab-wrapper']"
        tag="div"
        @before-enter="canCenterActivation = false"
        @before-leave="canCenterActivation = false"
        @after-enter="canCenterActivation = true"
        @after-leave="canCenterActivation = true"
      >
        <NTag
          v-for="[, t] of tabStore.openTabs"
          :key="t.path"
          :closable="tabStore.openTabs.size !== 1"
          class="mr2 cursor-pointer"
          :bordered="false"
          :data-path="t.path"
          :class="route.path === t.path && 'tag-selected'"
          @click="handleClick(t)"
          @close="handleClose(t)"
          @contextmenu.prevent="(e:any) => handleShowContextMenu(e, t)"
        >
          <template #icon>
            <AtIcon v-if="t.icon" size="16" :icon="`svg-${t.icon}`" />
          </template>
          {{ t.name }}
        </NTag>
      </TransitionGroup>
      <NDropdown
        placement="bottom-start"
        trigger="manual"
        :x="x"
        :y="y"
        :options="options"
        :show="showDropdown"
        :on-clickoutside="onClickOutside"
        @select="handleSelect"
      />
    </NScrollbar>
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
    position: relative;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 50px;
        height: 100%;
        pointer-events: none;
        content: '';
        box-shadow: none;
        transition: box-shadow 0.3s var(--n-bezier);
    }

    &.scroll-shadow__start {
        &::before {
            box-shadow: inset 16px 0 8px -8px rgba(148, 148, 148, 0.35);
        }
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        width: 50px;
        height: 100%;
        pointer-events: none;
        content: '';
        box-shadow: none;
        transition: box-shadow 0.3s var(--n-bezier);
    }

    &.scroll-shadow__end {
        &::after {
            box-shadow: inset -16px 0 8px -8px rgba(148, 148, 148, 0.35);
        }
    }
}

:deep(.n-scrollbar) {
    > .n-scrollbar-rail.n-scrollbar-rail--horizontal,
    + .n-scrollbar-rail.n-scrollbar-rail--horizontal {
        bottom: 2px;
    }

    .n-scrollbar-content {
        height: 100%;

        .tab-wrapper {
            height: 100%;
            padding: 0;

            .n-tag {
                height: 100%;
                padding: 0 16px;
                margin: 0;
                background-color: transparent;
                border-top: none;
                border-right: 1px solid var(--n-border-color);
                border-bottom: none;
                border-radius: 0;

                &:first-child {
                    border-left: 1px solid var(--n-border-color);
                }

                .n-tag__close {
                    margin-left: 12px;
                }
            }
        }

        .n-tag {
            &.tag-selected {
                background-color: v-bind('derivedColors.secondaryPrimaryColor');
            }

            &:hover,
            &.tag-selected {
                color: v-bind('themeVars.primaryColor');

                .n-tag__close {
                    color: v-bind('themeVars.primaryColor');
                }

                .n-tag__icon {
                    color: v-bind('themeVars.primaryColor');
                }
            }
        }
    }
}
</style>
