import type { AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/user'

/** 添加授权信息 */
export function addAuthHeader(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const { token, orgId, userInfo } = useUserStore()
    if (token) {
      (config.headers as Recordable).Authorization = `Bearer ${token}`;
      (config.headers as Recordable).org_id = orgId
    }
    if (userInfo) {
      (config.headers as Recordable)['User-Phone'] = btoa(userInfo.phone ?? '');
      (config.headers as Recordable)['User-Name'] = btoa(encodeURIComponent(userInfo.name) ?? '')
    }
    return {
      ...config,
    }
  })
}
