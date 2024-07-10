import type { AxiosInstance } from 'axios'
import type { RequestConfig } from '../types'

const controllerMap: Map<string, AbortController> = new Map()

/** 处理重复请求 */
export function repeatReq(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const { url, multiple } = config as RequestConfig
    let controller = controllerMap.get(url!)
    if (!multiple && controller)
      controller.abort()

    controller = new AbortController()
    // 如有需要，请自定义唯一标识，默认采用 url
    controllerMap.set(url!, controller)
    return {
      ...config,
      signal: controller.signal,
    }
  })
}
