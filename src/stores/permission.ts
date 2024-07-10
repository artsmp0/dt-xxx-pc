import { defineStore } from 'pinia'
import type { Component } from 'vue'
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import { useUserStore } from './user'
import Layout from '@/layout/index.vue'
import { router } from '@/router'
import { fallbackRoutes } from '@/router/fallback-routes'
import mockData from '@/router/mock.json'
import { camel2kebab } from '@/utils'
import { AUTH_API } from '@/api'

export interface MenuItemType {
  path: string
  name: string
  redirect?: string
  component?: Component | null
  meta?: RouteMeta
  children: MenuItemType[]
  parentPath?: string
}
interface Button {
  title: string
  path: string
}
export interface PermissionData {
  router: MenuItemType[]
  button: Button[]
  otherPage: MenuItemType[]
}

const modules = import.meta.glob('../views/**/*.vue')
function addFallbackRoutes() {
  // 最后加入 fallbackRoutes
  fallbackRoutes.forEach((route) => {
    router.addRoute(route)
  })
}

/** 获得首页 */
function getIndexPage(flatMenuRoutes: MenuItemType[], menuList: MenuItemType[]): string {
  const indexRoute = flatMenuRoutes.find(item => item.meta?.isIndex)
  if (indexRoute)
    return indexRoute.path

  const getFirstPage = (list: MenuItemType[]): string => {
    if (list.length === 0)
      return ''
    else if (list[0].component)
      return list[0].path
    else
      return getFirstPage(list[0].children)
  }

  return getFirstPage(menuList)
}

function transformRoute(item: MenuItemType, parentPath?: string): MenuItemType {
  if (item.meta?.micro) {
    return {
      path: item.path,
      meta: item.meta,
      name: item.path,
      component: () => import(`../layout/pages/MicroPage.vue`),
      children: [],
    }
  }
  else if (item.meta?.iframe) {
    return {
      path: item.path,
      meta: item.meta,
      name: item.path,
      component: () => import(`../layout/pages/IframePage.vue`),
      children: [],
    }
  }
  return {
    path: camel2kebab(item.path ?? ''),
    parentPath,
    name: item.path,
    meta: {
      ...item.meta,
      activeMenu: item.meta?.activeMenu ? camel2kebab(item.meta.activeMenu) : undefined,
    },
    component: modules[`../views${item.meta?.component ?? item.path}/index.vue`],
    children: [],
  }
}
function getLayoutRoutes(root: MenuItemType, list: MenuItemType[], parentPath?: string) {
  const menuRouter = [] as MenuItemType[]
  const flatMenuRoutes = [] as MenuItemType[]
  list.forEach((item) => {
    const route: MenuItemType = transformRoute(item, parentPath)
    if (item.children && item.children.length > 0) {
      const [childrenRoutes, childrenRouter] = getLayoutRoutes(root, item.children, camel2kebab(item.path ?? ''))
      flatMenuRoutes.push(...childrenRoutes)
      route.children = childrenRouter
    }
    // 多判断 !item.children，如果不写的话，仅当 item.children 为 [] 时，会进入 if 语句
    if (!item.children || item.children?.length === 0)
      root?.children?.push(route)
    if (item.children?.length > 0 && item.meta?.isPage) {
      // 这里要清除子路由，不然会被视为嵌套路由
      root?.children?.push({
        ...route,
        children: [],
      })
    }
    menuRouter.push(route)
    flatMenuRoutes.push(route)
  })
  return [flatMenuRoutes, menuRouter]
}

function getNoLayoutRoutes(list: MenuItemType[]) {
  return list.map(item => transformRoute(item)).map(item => ({ ...item, meta: item.meta }))
}

export const usePermissionStore = defineStore('permission', () => {
  const userStore = useUserStore()
  const menuList = shallowRef<MenuItemType[]>([])
  const flatMenuList = shallowRef<MenuItemType[]>([])
  const permission = ref<Button[]>([])

  const setMenuList = (value: MenuItemType[]) => (menuList.value = value)
  const setFlatMenuList = (value: MenuItemType[]) => (flatMenuList.value = value)
  const setPermission = (value: Button[]) => (permission.value = value)

  const setRoutes = (menus?: PermissionData) => {
    if (!menus)
      return
    const layoutRoute: MenuItemType = {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '',
      children: [] as MenuItemType[],
    }
    let [flatMenuRoutes, layoutChildrenRoutes] = getLayoutRoutes(layoutRoute, menus.router)
    setMenuList(layoutChildrenRoutes)
    // 表示不会出现在 layout 之中，也就是没有头部和侧边的独立页面
    const noLayoutRoutes = getNoLayoutRoutes(menus.otherPage || [])
    noLayoutRoutes.forEach(route => router.addRoute(route))
    flatMenuRoutes = flatMenuRoutes.concat(noLayoutRoutes)
    layoutRoute.redirect = getIndexPage(flatMenuRoutes, menuList.value)
    if (layoutRoute.children && layoutRoute.children.length > 0) {
      router.addRoute(layoutRoute)
      router.addRoute({
        path: '/:catchAll(.*)',
        redirect: { path: '/404' },
      })

      setFlatMenuList(flatMenuRoutes)
    }
    addFallbackRoutes()
  }

  /** 初始化路由 */
  const initRoutes = async () => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      setPermission(mockData.button)
      setRoutes(mockData as unknown as PermissionData)
    }
    else {
      // 有接口则替换为接口返回 data 即可
      const { data, err } = await AUTH_API.getPermissions({ org_id: userStore.orgId, system_code: userStore.systemCode })
      if (err) {
        addFallbackRoutes()
        return false
      }
      setPermission(data.data.button)
      setRoutes(data.data)
    }
    return true
  }

  /** 页面缓存 */
  const cachedPages = ref(new Set<string>())
  const cacheRoutes = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (cachedPages.value.has(to.name as string)) {
      // 如果当前去的页面被缓存了，但是上一次的页面不是缓存的页面，则需要清除缓存
      if (Array.isArray(to.meta.keepAlive)) {
        if (!to.meta.keepAlive.includes(from.name as string)) {
          cachedPages.value.delete(to.name as string)
        }
      }
    }
    if (!from.meta.keepAlive)
      return
    const {
      meta: { keepAlive },
      name,
    } = from
    const { name: toName } = to
    if (!name || typeof name !== 'string')
      return
    // 针对特定页面缓存
    if (Array.isArray(keepAlive)) {
      if (!toName || typeof toName !== 'string')
        return
      if (keepAlive.includes(toName)) {
        // 说明当前路由需要被缓存
        if (cachedPages.value.has(name))
          return

        cachedPages.value.add(name)
      }
      else {
        if (cachedPages.value.has(name)) {
          cachedPages.value.delete(name)
          return
        }
      }
      return
    }
    // 全局缓存
    if (cachedPages.value.has(name))
      return

    cachedPages.value.add(name)
  }

  // 按钮权限判断 buttonName:Array/String
  const vPermission = (buttonName: string[] | string) => {
    const params = ([] as string[]).concat(buttonName)
    const resultArr = permission.value.filter((item) => {
      return params.includes(item.title)
    })
    return resultArr.length > 0
  }

  return {
    menuList,
    flatMenuList,
    permission,
    cachedPages,
    cacheRoutes,
    setMenuList,
    setPermission,
    setRoutes,
    initRoutes,
    vPermission,
  }
})
