import { omit } from 'lodash-unified'
import { NSwitch } from 'naive-ui'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderSwitch = defineComponent({
  props: ['item', 'model', 'internalConfigStates', 'index'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates, index } = toRefs(compProps)
    const state = useDeps({ item, model })
    return () =>
      h(NSwitch, {
        value: model.value[item.value.field],
        onUpdateValue: (v: any) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.({
            value: v,
            configs: internalConfigStates,
            index: index?.value,
          })
        },
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
