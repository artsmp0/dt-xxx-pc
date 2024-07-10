import { NButton } from 'naive-ui'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { type RequestConfig, ResponseCode } from '../types'
import { useDiscrete } from '@/composables/discrete'
import { router } from '@/router'
import { useUserStore } from '@/stores/user'
import { downloadBlob, isDdOrZzd } from '@/utils'

let alreadyShowError = false

/** 处理授权接口 */
function handleAuth(response: AxiosResponse) {
  const { notification } = useDiscrete()

  const { data } = response
  if (data.code !== ResponseCode.authSuccess) {
    if (alreadyShowError) {
      return {
        err: response,
      }
    }
    alreadyShowError = true
    const userStore = useUserStore()
    if (isDdOrZzd()) {
      userStore.clearData()
      router.replace({
        name: 'Forbidden',
        query: {
          code: 401,
        },
      })
    }
    else {
      notification.warning({
        title: '访问失败！',
        description: '无权限或登录失效，请重新登录',
        action() {
          return (
            <NButton
              type="warning"
              onClick={() => {
                userStore.logout()
              }}
            >
              去登录
            </NButton>
          )
        },
      })
    }
    return {
      err: response,
    }
  }
  return {
    data,
    response,
  }
}

/** 处理接口结果 */
export function apiResult(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => {
      const { message } = useDiscrete()
      const { data } = response
      if (data instanceof Blob) {
        const requestConfig = response.config as RequestConfig
        if (requestConfig.autoDownloadBlob ?? true) {
          const header: any = response.headers
          const fileInfo = header.get('Content-Disposition')
          if (fileInfo) {
            const blob = new Blob([data as unknown as Blob], { type: header.get('Content-Type') })
            const filename = decodeURIComponent(fileInfo.split(';')?.[1]?.split('=')?.[1])
            downloadBlob(blob, filename)
          }
          else {
            message.warning('后端未暴露该响应头【Content-Disposition】，请让其指定【Access-Control-Expose-Headers: Content-Disposition】')
          }
        }
        return {
          data,
          err: null,
          response,
        } as any
      }

      if ((response.config as unknown as any).isAuthApi)
        return handleAuth(response) as any

      // eslint-disable-next-line eqeqeq
      if (data.code != ResponseCode.success) {
        // 业务错误直接这里报错的话，要求后端 msg 必填
        (response.config as unknown as any).showMessage && message.error(data.message)
        return {
          data,
          response,
          err: data,
        } as any
      }

      return {
        data: response.data,
        response,
        err: null,
      } as unknown as AxiosResponse
    },
    (err: any) => {
      const { message } = useDiscrete()
      if (err.code === 'ECONNABORTED')
        message.warning('请求超时取消，请重试或联系管理员！')
      else if (err.code === 'ERR_NETWORK')
        message.error('貌似断网了喔~~')
      else if (err.code !== 'ERR_CANCELED')
        message.error(err.message)
      else console.warn('cancel request:', err)

      return { err, data: undefined, response: undefined } as any
    },
  )
}
