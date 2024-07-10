import { omit } from 'lodash-unified'
import { NTreeSelect } from 'naive-ui'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps, useFetchField } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderTreeSelect = defineComponent({
  props: ['item', 'model', 'internalConfigStates', 'index'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates, index } = toRefs(compProps)
    const fetchRes = useFetchField(item.value.apiFn)
    const state = useDeps({ item, model }, fetchRes)
    const isStringLabel = typeof item.value.label === 'string'
    return () =>
      h(NTreeSelect, {
        value: model.value[item.value.field],
        onUpdateValue: (v: any, option: any, meta: any) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.({
            value: v,
            configs: internalConfigStates,
            index: index?.value,
            option,
            meta,
          })
        },
        loading: fetchRes?.loading.value,
        options: fetchRes?.options.value,
        clearable: true,
        placeholder: isStringLabel ? `请选择${item.value.label}` : undefined,
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
