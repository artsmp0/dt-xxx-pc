import type { AxiosInstance } from 'axios'
import type { RequestConfig } from '../types'

/** 解析路径参数 */
export function parseArgs(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const { url, args } = config as RequestConfig
    if (args && url) {
      const lostParams: string[] = []
      const replacedUrl = url.replaceAll(/\{(.+?)\}/g, (_, arg: string) => {
        if (!(args as Record<string, string>)[arg])
          lostParams.push(arg)

        return (args as Record<string, string>)[arg] as string
      })
      if (lostParams.length > 0)
        // eslint-disable-next-line antfu/curly
        return Promise.reject(
          new Error(`存在丢失的路径参数：${lostParams.join(',')}`),
        )

      return { ...config, url: replacedUrl }
    }
    return config
  })
}
