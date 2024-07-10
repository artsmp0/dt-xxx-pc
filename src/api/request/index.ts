import { makeRequest } from './request'
import type { RequestConfig } from './types'

export { makeRequest as request } from './request'

type RestConfig = Partial<Omit<RequestConfig, 'params' | 'data' | 'args'>>

/** query 传参 get */
export function httpGet<Res = any, Params = any, PathParams extends string = string>(url: string, otherConfigs?: RestConfig) {
  return makeRequest<Res, Params, undefined, PathParams>({
    method: 'get',
    url,
    ...otherConfigs,
  })
}

/** post 请求 */
export function httpPost<Res = any, Data = any, PathParams extends string = string>(url: string, otherConfigs?: RestConfig) {
  return makeRequest<Res, undefined, Data, PathParams>({
    method: 'post',
    url,
    ...otherConfigs,
  })
}

/** put 请求 */
export function httpPut<Res = any, Data = any, PathParams extends string = string>(url: string, otherConfigs?: RestConfig) {
  return makeRequest<Res, undefined, Data, PathParams>({
    method: 'put',
    url,
    ...otherConfigs,
  })
}

/** delete 请求 */
export function httpDelete<Res = any, Data = any, PathParams extends string = string>(url: string, otherConfigs?: RestConfig) {
  return makeRequest<Res, undefined, Data, PathParams>({
    method: 'delete',
    url,
    ...otherConfigs,
  })
}
