import type { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * makeRequest 函数返回的最终结果
 * @param data 接口结果
 * @param err 如果有就说明接口报错了
 */
export interface MakeRequestRes<D = unknown, E = any> {
  data: D
  err?: E
  response?: AxiosResponse<D>
}

/** 请求配置 */
export type RequestConfig<D = unknown> = {
  /**
   * 是否显示业务错误的弹窗
   * @default true
   */
  showMessage?: boolean
  /**
   * 是否允许同一接口同时发起多次请求
   * @default false
   */
  multiple?: boolean
  /**
   * 路径参数方式
   * @default undefined
   */
  args?: unknown
  /**
   * 是否自动下载 blob
   * @default true
   */
  autoDownloadBlob?: boolean
  /** 授权 api 要额外处理 */
  isAuthApi?: boolean
} & AxiosRequestConfig<D>

type GetUnionArgs<T extends string | undefined> =
  T extends `${infer _L}{${infer M}}${infer R}` ? M | GetUnionArgs<R> : never
/** 自动计算路径参数 */
type GetFinalArgs<T extends string | undefined> = {
  [P in GetUnionArgs<T>]?: string | number;
}

type MakeRequestFnResult<T> = Promise<MakeRequestRes<T>>
// type OnlyParamsReqConfig<T> = Partial<Omit<RequestConfig, 'params'>> & { params?: T }

export interface MakeRequestFn {
  /** 传递接口 querystring 请求参数或 post data 请求参数或 路径参数 和返回结果类型 */
  <Payload, Params, Data, ArgsURL extends string | undefined = undefined>(
    config: Partial<Omit<RequestConfig<Data>, 'params' | 'args'>> & { params?: Params, args?: GetFinalArgs<ArgsURL> }
  ): (
    params?: Params,
    data?: Data,
    args?: GetFinalArgs<ArgsURL>,
    config?: Partial<Omit<RequestConfig<Data>, 'params' | 'args' | 'data'>>
  ) => MakeRequestFnResult<Payload>
  (config: any): (...args: any[]) => MakeRequestFnResult<any>
}

// ============================以下内容可能需要按后端的格式修改============================

/** 定义接口业务状态的码 */
export const enum ResponseCode {
  success = 200,
  // eslint-disable-next-line ts/no-duplicate-enum-values
  authSuccess = 200,
  authFailed = 401,
}

/** 接口的基本形状 */
export interface BaseRes<T = unknown> {
  code: string | number
  message: string
  data: T
}

export type PageParams<T = unknown> = Prettify<
  {
    page?: number
    size?: number
    fetch_all?: 1
  } & T
>

export interface PageRes<T> {
  code: string | number
  message: string
  data: T[]
  meta: { total: number }
}
