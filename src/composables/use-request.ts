import { type Pausable, useDebounceFn, useThrottleFn, useTimeoutPoll } from '@vueuse/core'

interface UseRequestOptions<Params> {
  defaultParams?: Params
  /** 是否手动发送请求 */
  manual?: boolean
  /** 节流时间，默认为 0 ms，不进行节流 */
  throttle?: number
  /** 防抖时间，默认为 0 ms，不进行防抖，优先级比节流时间更大 */
  debounce?: number
  /** 轮询时间，单位 ms，不传不进行轮询 */
  polling?: number
  /** 是否在取消请求错误发生的时候取消 loading */
  cancelLoadingWhenErr?: boolean
  onSuccess?: () => void
}

export function useRequest<
    T extends (params: any) => Promise<any>,
    RunParams = Parameters<T>['0'],
    Data = Awaited<ReturnType<T>>['data']['data'],
    Error = Awaited<ReturnType<T>>['err'],
>(apiFn: T, { manual, defaultParams, throttle, polling, debounce, cancelLoadingWhenErr, onSuccess }: UseRequestOptions<RunParams> = { manual: true }) {
  const loading = shallowRef(false)
  const data = shallowRef<Data>()
  const err = shallowRef<Error>()

  const run = async (params?: RunParams, withDefaultParams = true) => {
    loading.value = true
    const finalParams = withDefaultParams ? { ...defaultParams, ...params } : params
    const res = await apiFn(finalParams)

    if (!(res.err?.code === 'ERR_CANCELED' && cancelLoadingWhenErr)) {
      // 取消请求类型的错误不需要取消loading
      loading.value = false
    }

    if (res.err) {
      err.value = res.err
      data.value = undefined
      return
    }
    data.value = res.data.data
    onSuccess?.()
    err.value = undefined
    return data.value
  }

  let outerRun = useThrottleFn(run, debounce ? 0 : throttle ?? 0, false, true)
  if (debounce)
    outerRun = useDebounceFn(run, debounce)

  !manual && outerRun(defaultParams)

  let pollingControl: Pausable | undefined
  if (polling)
    pollingControl = useTimeoutPoll(outerRun as any, polling)

  return { data, loading, err, run: outerRun as (params?: RunParams | undefined) => Promise<void>, pollingControl }
}
