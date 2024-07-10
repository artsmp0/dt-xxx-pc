export const fallbackRoutes = [

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/layout/pages/404.vue'),
    meta: { whiteList: true },
  },
]

export const defaultRoutes = [
  {
    name: 'Redirect',
    path: '/redirect/:path(.*)',
    component: () => import('@/layout/pages/Redirect.vue'),
    meta: { whiteList: true },
  },
  {
    name: 'Auth',
    path: '/auth',
    component: () => import('@/layout/pages/Auth.vue'),
    meta: { whiteList: true },
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/layout/pages/404.vue'),
    meta: { whiteList: true },
  },
  {
    name: '401',
    path: '/401',
    component: () => import('@/layout/pages/401.vue'),
    meta: { whiteList: true },
  },
]
