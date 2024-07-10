<script setup lang="tsx">
import { useWindowSize } from '@vueuse/core'
import { type MenuOption, NEllipsis } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { RouteMeta } from 'vue-router'
import { AtIcon } from '@gupo-admin/components'
import { type MenuItemType, usePermissionStore } from '@/stores/permission'
import { useUIStore } from '@/stores/ui'
import { camel2kebab } from '@/utils'

type AtMenuOption = MenuOption & {
  name: string
  meta: RouteMeta
}

const permissionStore = usePermissionStore()

function resolveMenu(menus: MenuItemType[]) {
  const list: MenuOption[] = []
  menus.forEach((m) => {
    if (m.meta?.hideInMenu)
      return
    const children = resolveMenu(m.children)
    list.push({
      label: m.meta?.title,
      key: m.path,
      name: m.name,
      meta: m.meta,
      children: children.length > 0 ? children : undefined,
    })
  })
  return list
}

const menuOptions = shallowRef<MenuOption[]>(resolveMenu(permissionStore.menuList))

const renderIcon: any = (option: AtMenuOption) => {
  const icon = option.meta?.icon
  if (!icon)
    return null
  return <AtIcon icon={`svg-${icon}`} />
}

const renderLabel: any = (option: AtMenuOption) => {
  const el = <NEllipsis tooltip={{ placement: 'right', flip: false }}>{option.label}</NEllipsis>
  if (!option.children || option.meta.isPage) {
    // 没有 children 说明一定是页面，isPage 标识打上也表示一定是个页面
    return <RouterLink to={{ path: option.key as string }}>{el}</RouterLink>
  }
  return el
}

const route = useRoute()
const selectedItem = computed(() => {
  const activeMenu = route.query.activeMenu as string || route.meta.activeMenu
  if (activeMenu)
    return camel2kebab(activeMenu)
  if (route.meta.hideInMenu) {
    // 表示是详情页
    const t = permissionStore.flatMenuList.find(m => m.path === route.path)
    if (t)
      return t.parentPath
  }
  return route.path
})

const { width } = useWindowSize()
const collapsed = ref(false)
watch(width, (v) => {
  if (v > 768)
    collapsed.value = false
  else
    collapsed.value = true
})

const UI = useUIStore()
const SIDE_WIDTH = computed(() => UI.defaultSetting.SIDE_WIDTH)
</script>

<template>
  <NLayoutSider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="SIDE_WIDTH"
    :collapsed="collapsed"
    :native-scrollbar="false"
    show-trigger="bar"
    :trigger-style="{ right: '-24px' }"
    :collapsed-trigger-style="{ right: '-24px' }"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <NMenu
      :value="selectedItem"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :collapsed="collapsed"
      :render-icon="renderIcon"
      :render-label="renderLabel"
    />
  </NLayoutSider>
</template>
