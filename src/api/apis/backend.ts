import { httpGet, httpPost } from '../request'
import type { BaseRes, PageParams } from '../request/types'

export const BACKEND_API = {
  /** 演示 get 分页请求 */
  testList: (() => {
    return (params: PageParams<any>): Promise<any> => {
      const { page, size } = params
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'ok',
            code: 200,
            data: {
              meta: {
                total: 1000,
              },
              data: Array.from({ length: size }).map((_, idx) => ({
                id: size * (page - 1) + idx,
                1: `名字${size * (page - 1) + idx}`,
                2: `${idx % 3 === 0 ? '描述描述描述描述描述描述描述描述' : idx % 5 === 0 ? '反反复复方法反反复复发' : '描述'}${
                                      size * (page - 1) + idx
                                  }`,
                3: `${idx % 4 === 0 ? '数据量数据量数据量数据量' : '数据量'}${size * (page - 1) + idx}`,
                4: `占用磁盘${idx % 3}`,
                5: `最近更新时间${size * (page - 1) + idx}`,
              })),
            },
          })
        }, 500)
      })
    }
  })(),
  /** 演示 get 普通请求 */
  getTest: httpGet<BaseRes<boolean>, { search?: string, xx?: string }>('/api/get'),
  /** 演示 post 请求 */
  postTest: httpPost<BaseRes<boolean>, { username: string, password: string }>('/api/post'),
  /** 此处演示路径参数的请求方式 */
  pathParamTest: httpGet<BaseRes<boolean>, { name: string }, '/api/user/{id}/{age}'>('/api/user/{id}/{age}'),
  downloadTest: httpGet<BaseRes<{ aa: string }> | Blob>('/download/test', { responseType: 'blob' }),
}
