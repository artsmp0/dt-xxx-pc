import { useDark } from '@vueuse/core'
import { useThemeVars } from 'naive-ui'
import { composite } from 'seemly'
import { opacityColor } from '@/utils/color'
import { useLocalStorage } from '@/utils/storage'

export const isDark = useDark({ initialValue: 'light', storageRef: useLocalStorage('theme', 'light') })

const isAppearanceTransition
    = typeof document !== 'undefined'
    // @ts-expect-error: Transition API
    && document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggleDark(event?: MouseEvent) {
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  })
}

export function useAtTheme() {
  const themeVars = useThemeVars()
  const derivedColors = computed(() => {
    return {
      secondaryPrimaryColor: opacityColor(themeVars.value.primaryColor, 0.2),
      secondaryErrorColor: opacityColor(themeVars.value.errorColor),
      secondaryWarningColor: opacityColor(themeVars.value.warningColor),
      secondaryInfoColor: opacityColor(themeVars.value.infoColor),
      // 混色：表格背景色和主色的混色，用于表格行 hover 的背景色。
      tableHoverColor: composite(themeVars.value.primaryColor, opacityColor(themeVars.value.tableColor, 0.85)),
      tagIndeterminateColor: opacityColor(themeVars.value.primaryColor, 0.36),
    }
  })
  return { derivedColors, themeVars }
}
