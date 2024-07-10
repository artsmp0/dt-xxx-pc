import { omit } from 'lodash-unified'
import { NCascader, NSpin } from 'naive-ui'
import { defineComponent, h, toRefs, unref } from 'vue'
import { useDeps, useFetchField } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderCascader = defineComponent({
  props: ['item', 'model', 'internalConfigStates', 'index'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates, index } = toRefs(compProps)
    const fetchRes = useFetchField(item.value.apiFn)
    const state: any = useDeps({ item, model }, fetchRes)
    const isStringLabel = typeof item.value.label === 'string'
    return () => {
      return h(
        NCascader,
        {
          clearable: true,
          maxTagCount: 'responsive',
          options: fetchRes?.options.value,
          value: model.value[item.value.field],
          placeholder: isStringLabel ? `请选择${item.value.label}` : undefined,
          onUpdateValue: (v: any, option: any, pathValues: any) => {
            model.value[item.value.field] = v
            item.value.props?.onChange?.({
              value: v,
              configs: internalConfigStates,
              index: index?.value,
              option,
              pathValues,
            })
          },
          ...omit(item.value.props, needOmitKeyArr),
          ...state,
        },
        {
          arrow: () =>
            state?.loading ?? (item.value.props as any)?.loading ?? unref(fetchRes?.loading)
              ? h(NSpin, {
                size: 12,
              })
              : undefined,
        },
      )
    }
  },
})
