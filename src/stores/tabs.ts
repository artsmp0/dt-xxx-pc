import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { usePermissionStore } from './permission'
import { useUIStore } from './ui'
import { useLocalStorage } from '@/utils/storage'

export interface Tab {
  name: string
  path: string
  icon?: string
}

export const useTabsStore = defineStore('tabs', () => {
  const tabbarData = useLocalStorage<{ openTabs: [string, Tab][], accessHistory: string[] }>('tabbar', {
    openTabs: Array.from(new Map().entries()),
    accessHistory: [],
  })
  const permissionStore = usePermissionStore()
  const UI = useUIStore()

  const needStorageTab = computed(() => UI.defaultSetting.STORAGE_TAB)

  const accessHistory = ref(new Set(Array.isArray(tabbarData.value.accessHistory) && needStorageTab.value ? tabbarData.value.accessHistory : []))
  const openTabs = ref(new Map(tabbarData.value.openTabs.length > 0 && needStorageTab.value ? tabbarData.value.openTabs : []))

  // 保持两者间数据同步
  function syncTabFromMenu() {
    openTabs.value.forEach((value, key) => {
      const targetMenu = permissionStore.flatMenuList.find(v => v.path === value.path)
      if (targetMenu) {
        value.name = targetMenu.meta!.title!
        value.icon = targetMenu.meta?.icon
      }
      else {
        openTabs.value.delete(key)
      }
    })
  }
  syncTabFromMenu()
  watch(
    () => openTabs.value.size,
    () => {
      if (needStorageTab.value)
        tabbarData.value.openTabs = Array.from(openTabs.value.entries())
    },
  )

  const addTab = (route: RouteLocationNormalizedLoaded) => {
    if (route.path === '/redirect' || route.meta?.hideInTab)
      return

    if (openTabs.value.has(route.path))
      return

    const newTab = {
      name: route.meta.title!,
      path: route.path,
      icon: route.meta.icon,
    }
    openTabs.value.set(route.path, newTab)
  }

  const removeTab = (tab: Tab) => {
    if (openTabs.value.size === 1)
      return false
    openTabs.value.delete(tab.path)
    return true
  }

  const removeOther = (tab: Tab) => {
    openTabs.value = new Map([[tab.path, tab]])
  }

  const removeAll = () => {
    openTabs.value = new Map()
  }

  const removeRight = (tab: Tab) => {
    const ts: Tab[] = []
    let idx = 0
    let targetIdx = 0
    openTabs.value.forEach((t) => {
      if (t.path === tab.path)
        targetIdx = idx

      ts.push(t)
      idx++
    })
    const delTabs = ts.splice(targetIdx + 1, ts.length - targetIdx)
    openTabs.value = new Map(ts.map(t => [t.path, t]))
    return delTabs
  }

  const removeLeft = (tab: Tab) => {
    const ts: Tab[] = []
    let idx = 0
    let targetIdx = 0
    openTabs.value.forEach((t) => {
      if (t.path === tab.path)
        targetIdx = idx

      ts.push(t)
      idx++
    })
    const delTabs = ts.splice(0, targetIdx)
    openTabs.value = new Map(ts.map(t => [t.path, t]))
    return delTabs
  }

  const resolveHistory = (p: string, isDel = false) => {
    if (accessHistory.value.has(p))
      accessHistory.value.delete(p)

    if (!isDel)
      accessHistory.value.add(p)

    if (needStorageTab.value)
      tabbarData.value.accessHistory = [...accessHistory.value]
  }

  return {
    accessHistory,
    openTabs,
    addTab,
    removeTab,
    removeOther,
    removeAll,
    removeRight,
    removeLeft,
    resolveHistory,
  }
})
