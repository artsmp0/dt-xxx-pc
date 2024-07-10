import { cloneDeep, isArray, omit } from 'lodash-unified'
import { NFormItemGi, NGrid } from 'naive-ui'
import { type VNode, computed, defineComponent, h, ref, toRefs } from 'vue'
import { EXTRA_FORM_ITEM_PROPS, getLabelRenderer, useDeps } from '../utils'
import type { FormItemConfig, RenderFnParams } from '../types'
import { AtIconBtn } from '../../../icon'
import { FORM_FIELDS } from './fields'

export const renderMultipleBlock = defineComponent({
  props: ['item', 'model'],
  setup(compProps: RenderFnParams) {
    const { item, model } = toRefs(compProps)
    const state = useDeps({ item, model })
    const defaultItem = item.value.multipleConfig?.defaultItem ?? cloneDeep(model.value[item.value.field][0])
    if (!model.value[item.value.field]) {
      console.warn(`表单 model 无 ${item.value.field} 字段！`)
      return null
    }
    if (!item.value.children?.length)
      return null

    const disableDel = computed(() => {
      const limit = item.value.multipleConfig?.limit
      if (!limit)
        return
      return model.value[item.value.field].length <= limit
    })

    const uuids: string[] = []
    const internalGenConfigs = ref<any[][]>([])

    const genWidgetByIndex = (i: number) => {
      const subItems: VNode[] = []
      if (!compProps.item.children)
        return
      const currentConfig = internalGenConfigs.value[i]
      if (!Array.isArray(currentConfig))
        return
      subItems.push(
        ...(currentConfig
          .map((child: FormItemConfig) => {
            const path = `${item.value.field}.${i}.${child.field}`
            return child.hide
              ? null
              : (
                <NFormItemGi
                  {...omit(child, EXTRA_FORM_ITEM_PROPS)}
                  showLabel={!!child.label}
                  labelStyle={{ alignItems: 'center' }}
                  span={child.span ?? 24}
                  rule={child.rule ?? compProps.item.rule}
                  path={path}
                  key={Math.random()}
                  {...{ target: path }}
                >
                  {{
                    default: () =>
                      h(FORM_FIELDS[child.type]!, {
                        item: { ...child, path },
                        model: model.value[item.value.field][i],
                        internalConfigStates: currentConfig,
                        index: i,
                      }),
                    label: getLabelRenderer(child.label),
                  }}
                </NFormItemGi>
                )
          })
          .filter(Boolean) as any[]),
      )
      return (
        <div class="mb2 w-full rounded-base bg-base px2 pt2 hover:shadow-base bd-base" key={uuids[i]}>
          <div class="mb1 flex items-center justify-between">
            <div class="h5 w5 rounded-base bg-gray/30 text-center text-xs lh-20px">{i + 1}</div>
            {item.value.multipleConfig
              ? (
                <AtIconBtn
                  icon="i-ph-trash-simple-duotone"
                  type="error"
                  text
                  disabled={disableDel.value}
                  onClick={() => {
                    if (item.value.multipleConfig?.onRemoveButtonClick) {
                      const shouldRemove = item.value.multipleConfig?.onRemoveButtonClick(i, currentConfig, internalGenConfigs)
                      if (!shouldRemove)
                        return
                    }
                    model.value[item.value.field].splice(i, 1)
                    uuids.splice(i, 1)
                    internalGenConfigs.value.splice(i, 1)
                  }}
                >
                </AtIconBtn>
                )
              : null}
          </div>
          <NGrid xGap={12} {...item.value.props} {...state}>
            {subItems}
          </NGrid>
        </div>
      )
    }

    const widgets = computed(() => {
      const genWidgetArr: any[] = []
      if (!model.value[item.value.field] && defaultItem) {
        // 如果 model[field] 为 null 或者 undefined 并且存在 defaultItem，则说明这是一个对象数组表单。需要初始化他为一个数组。避免报错 xxx undefined。
        model.value[item.value.field] = []
      }
      if (isArray(model.value[item.value.field])) {
        for (let i = 0; i < model.value[item.value.field].length; i++) {
          if (!uuids[i])
            uuids.push(`${Math.random()}`)
          if (!internalGenConfigs.value[i])
            internalGenConfigs.value[i] = cloneDeep(compProps.item.children!)
          genWidgetArr.push(genWidgetByIndex(i))
        }
      }
      else {
        genWidgetArr.push(
          <NGrid
            xGap={12}
            {...item.value.props}
            {...state}
            class={`w-full rounded-base bd-base bg-base ${item.value.children?.[0].labelPlacement === 'left' ? 'pt6 px6' : 'px2 pt1'}`}
          >
            {item.value.children?.map((child) => {
              const path = `${item.value.field}.${child.field}`
              return (
                <NFormItemGi
                  {...omit(child, EXTRA_FORM_ITEM_PROPS)}
                  span={child.span ?? 24}
                  rule={child.rule ?? compProps.item.rule}
                  labelStyle={{ alignItems: 'center' }}
                  path={path}
                  key={path}
                  {...{ target: path }}
                >
                  {{
                    default: () => h(FORM_FIELDS[child.type]!, { item: { ...child, path }, model: model.value[item.value.field] }),
                    label: getLabelRenderer(child.label),
                  }}
                </NFormItemGi>
              )
            })}
          </NGrid>,
        )
      }
      return genWidgetArr
    })

    return () => {
      return (
        <div class="w-full">
          {widgets.value}
          {item.value.multipleConfig && (
            <AtIconBtn
              icon="i-ph-plus-circle-duotone"
              type="primary"
              secondary
              block
              {...item.value.multipleConfig.addBtnProps}
              onClick={() => {
                const newItems = cloneDeep(compProps.item.children!)
                if (item.value.multipleConfig?.onAddButtonClick) {
                  const shouldAdd = item.value.multipleConfig?.onAddButtonClick?.(newItems)
                  if (!shouldAdd)
                    return
                }
                model.value[item.value.field].push(cloneDeep(defaultItem))
                internalGenConfigs.value.push(newItems)
                uuids.push(`${Math.random()}`)
              }}
            >
              {compProps.item.multipleConfig?.addBtnText}
            </AtIconBtn>
          )}
        </div>
      )
    }
  },
})
