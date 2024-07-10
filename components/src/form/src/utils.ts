import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import type { Ref } from 'vue'
import { isRef, reactive, ref, shallowRef, watch } from 'vue'
import type { AtFormItemConfig } from '..'
import type { Recordable } from '../../types'
import type { FormItemConfig } from './types'

/** 传给表单 FormItem 时需要排除掉这些额外的属性 */
export const EXTRA_FORM_ITEM_PROPS = [
  'type',
  'field',
  'label',
  'props',
  'deps',
  'listener',
  'deep',
  'hide',
  'children',
  'apiFn',
  'button',
  'multipleConfig',
  'component',
] as any

export function useFetchField(apiFn?: Function) {
  if (!apiFn)
    return undefined
  const loading = ref(false)
  const options = shallowRef([])
  const fetchData = async () => {
    loading.value = true
    const res = await apiFn()
    loading.value = false
    options.value = res
  }
  tryOnMounted(fetchData)

  return { loading, options, fetchData }
}

export function useDeps({ item, model }: { item: Ref<AtFormItemConfig>, model: Ref<Recordable> }, args?: ReturnType<typeof useFetchField>) {
  const state = reactive({})
  if (!item.value.deps)
    return state

  const watcher = async () => {
    Object.assign(state, await item.value.listener?.(args?.fetchData))
  }
  tryOnMounted(watcher)
  const refDeps = item.value.deps.filter(d => isRef(d))

  const stop1 = watch(() => item.value.deps?.map(k => (typeof k === 'string' ? model.value[k] : null)), watcher, {
    deep: item.value.deep,
  })
  const stop2 = watch(refDeps, watcher)

  tryOnUnmounted(() => {
    stop1()
    stop2()
  })

  return state
}

export function getLabelRenderer(label: FormItemConfig['label']) {
  if (typeof label === 'string')
    return () => label
  return label
}
