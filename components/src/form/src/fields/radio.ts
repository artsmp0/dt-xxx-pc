import { omit } from 'lodash-unified'
import { NRadio, NRadioButton, NRadioGroup, NSpace } from 'naive-ui'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderRadio = defineComponent({
  props: ['item', 'model', 'internalConfigStates', 'index'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates, index } = toRefs(compProps)
    if (!item.value.props?.options)
      console.warn('radio options must be required!')

    const state = useDeps({ item, model })
    const children = item.value.button
      ? (item.value.props as any)?.options.map((o: any) =>
          h(
            NRadioButton,
            {
              value: o.value,
              key: o.value,
            },
            () => o.label,
          ),
        )
      : h(
        NSpace,
        null,
        () =>
          (item.value.props as any)?.options.map((o: any) =>
            h(
              NRadio,
              {
                value: o.value,
                key: o.value,
              },
              () => o.label,
            ),
          ),
      )
    return () =>
      h(
        NRadioGroup,
        {
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
        } as any,
        () => children,
      )
  },
})
