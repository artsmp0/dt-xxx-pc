<script setup lang="ts">
import { cloneDeep, isArray, mergeWith, omit } from 'lodash-unified'
import { type FormInst, NEl, NForm, NFormItem, NFormItemGi, NGrid, NGridItem } from 'naive-ui'
import { computed, reactive, shallowRef } from 'vue'
import { EXTRA_FORM_ITEM_PROPS } from './utils'
import type { AtFormProps } from './types'
import { FORM_FIELDS } from './fields/fields'

defineOptions({
  name: 'AtForm',
})
const props = withDefaults(defineProps<AtFormProps>(), {
  scrollToFirstError: true,
  layout() {
    return { xGap: 16 }
  },
})

const finalConfigs = computed(() => {
  return props.configs.map((item) => {
    return {
      ...item,
      path: item.field,
    }
  })
})

const formRef = shallowRef<FormInst>()
const cloneInitVal = cloneDeep(props.model)

async function validate(...args: any[]) {
  try {
    await formRef.value?.validate(...args)
    return Promise.resolve()
  }
  catch (error: any) {
    if (Array.isArray(error) && props.scrollToFirstError) {
      const t = document.querySelector(`[target="${error[0][0].field}"]`)
      t?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
    return Promise.reject(error)
  }
}

async function setValue(newValue: any) {
  mergeWith(props.model, newValue, (oldVal, newVal) => {
    // 重置对象数组类型的表单需要对齐数组的长度
    if (isArray(oldVal) && isArray(newVal) && oldVal.length > newVal.length)
      oldVal.splice(newVal.length - oldVal.length, Number.POSITIVE_INFINITY)
  })
}

async function resetValue() {
  const resetData = props.initValue ?? cloneInitVal
  setValue(resetData)
  // 去除 model 中不在 resetData 中的字段
  for (const key in props.model) {
    if (!Object.hasOwn(resetData, key))
      // eslint-disable-next-line vue/no-mutating-props
      delete props.model[key]
  }
  restoreValidation()
}

function restoreValidation() {
  formRef.value?.restoreValidation()
}

function isString(thing: any) {
  return typeof thing === 'string'
}
defineExpose(
  reactive({
    validate,
    resetValue,
    setValue,
    restoreValidation,
    getEl() { return (formRef.value as any).$el },
  }),
)
</script>

<template>
  <NEl>
    <NForm ref="formRef" :model="model" v-bind="{ ...$attrs, ...props.nFormProps }">
      <!-- for search component -->
      <NGrid v-if="!props.nFormProps?.inline" v-bind="layout">
        <template v-for="config in finalConfigs" :key="config.field">
          <template v-if="config.type !== 'titleBar'">
            <NFormItemGi
              v-if="!config.hide"
              v-bind="omit(config, EXTRA_FORM_ITEM_PROPS)"
              :span="config.span ?? 24"
              :path="config.field"
              :target="config.field"
            >
              <template v-if="config.label" #label>
                <span v-if="isString(config.label)">{{ config.label }}</span>
                <Component :is="config.label" v-else />
              </template>
              <Component :is="FORM_FIELDS[config.type]" :item="config" :model="model" />
            </NFormItemGi>
          </template>
          <NGridItem v-else :span="24">
            <div
              class="relative mb4 flex flex-auto items-center gap2 of-hidden rounded-base bg-gray/20 text-16px font-bold"
              :class="titleBarCls"
            >
              <span class="h9 w1 bg-primary" />
              <span v-if="isString(config.label)">{{ config.label }}</span>
              <Component :is="config.label" v-else />
            </div>
          </NGridItem>
        </template>
      </NGrid>
      <!-- normal form -->
      <template v-for="config in finalConfigs" v-else :key="config.field">
        <NFormItem
          v-if="!config.hide"
          v-bind="omit(config, EXTRA_FORM_ITEM_PROPS)"
          :span="config.span ?? 24"
          :path="config.field"
          :target="config.field"
        >
          <template v-if="config.label" #label>
            <span v-if="isString(config.label)">{{ config.label }}</span>
            <Component :is="config.label" v-else />
          </template>
          <Component :is="FORM_FIELDS[config.type]" :item="config" :model="model" />
        </NFormItem>
      </template>
      <slot name="search" />
    </NForm>
  </NEl>
</template>
