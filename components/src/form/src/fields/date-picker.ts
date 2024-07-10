import { omit } from 'lodash-unified'
import { NDatePicker } from 'naive-ui'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderDatePicker = defineComponent({
  props: ['item', 'model', 'internalConfigStates', 'index'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates, index } = toRefs(compProps)
    const state = useDeps({ item, model })
    return () =>
      h(NDatePicker, {
        clearable: true,
        formattedValue: model.value[item.value.field],
        onUpdateFormattedValue: (v: any) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.(
            {
              value: v,
              configs: internalConfigStates,
              index: index?.value,
            },
          )
        },
        style: { width: '100%' },
        ...omit(item.value.props, ['formattedValue', 'onUpdateFormattedValue', 'onUpdate:formattedValue'].concat(needOmitKeyArr)),
        ...state,
      } as any)
  },
})
