import { omit } from 'lodash-unified'
import { NSelect } from 'naive-ui'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps, useFetchField } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderSelect = defineComponent({
  props: ['item', 'model', 'internalConfigStates', 'index'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates, index } = toRefs(compProps)
    const fetchRes = useFetchField(item.value.apiFn)
    const state = useDeps({ item, model }, fetchRes)
    const isStringLabel = typeof item.value.label === 'string'
    return () =>
      h(NSelect, {
        value: model.value[item.value.field],
        onUpdateValue: (v: any, option: any) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.({
            value: v,
            configs: internalConfigStates,
            index: index?.value,
            option,
          })
        },
        clearable: true,
        loading: fetchRes?.loading.value,
        options: fetchRes?.options.value,
        placeholder: isStringLabel ? `请选择${item.value.label}` : undefined,
        filterable: true,
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
