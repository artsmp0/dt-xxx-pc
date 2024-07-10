import { httpGet } from '../request'
import type { BaseRes } from '../request/types'
import type { PermissionData } from '@/stores/permission'

const userApiUrl = import.meta.env.VITE_USER_API_URL
export interface Org {
  id: number
  name: string
}

const enum URL {
  token = '/open/user/tokenDetail',
  routes = '/open/permission/router',
  org = '/org/user/system/org',
  logout = '/apiUser/logout',
}

export const AUTH_API = {
  getToken: httpGet(URL.token, {
    baseURL: userApiUrl,
    isAuthApi: true,
  }),
  getPermissions: httpGet<BaseRes<PermissionData>, { system_code: string, org_id: string | number }>(URL.routes, {
    baseURL: userApiUrl,
    isAuthApi: true,
  }),
  getOrgs: httpGet<BaseRes<Org[]>, { system_code: string }>(URL.org, {
    baseURL: userApiUrl,
    isAuthApi: true,
  }),
  logout: httpGet(URL.logout, {
    baseURL: userApiUrl,
    isAuthApi: true,
  }),
}
