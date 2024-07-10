<script setup lang="ts">
import type { editor } from 'monaco-editor'
import loader from '@monaco-editor/loader'
import { useThemeVars } from 'naive-ui'
import useFormItem from 'naive-ui/es/_mixins/use-form-item'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import type { AtMonacoEditorProps } from './type'

defineOptions({
  name: 'AtMonacoEditor',
})

const props = withDefaults(defineProps<AtMonacoEditorProps>(), {
  options: () => ({ readOnly: false, language: 'shell' }),
})

const emit = defineEmits<{
  'blur': []
  'focus': []
  'change': [string]
  'update:value': [string]
  'updateValue': [string]
}>()

const editorInst = shallowRef<editor.IStandaloneCodeEditor | null>(null)
const formItem = useFormItem({})
const editorRef = shallowRef()
const getValue = () => editorInst.value?.getValue()
async function initMonacoEditor() {
  const dom = editorRef.value
  if (dom) {
    const monaco = await loader.init()
    editorInst.value = monaco.editor.create(dom, {
      ...props.options,
      value: props.defaultValue ?? props.value,
      readOnly: formItem.mergedDisabledRef.value || props.options?.readOnly,
      automaticLayout: true,
      theme: 'vs-dark',
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
    })
    editorInst.value.onDidChangeModelContent(() => {
      const value = editorInst.value?.getValue() || ''
      emit('update:value', value)
      emit('updateValue', value)
      emit('change', value)
      formItem.nTriggerFormChange()
      formItem.nTriggerFormInput()
    })
    editorInst.value.onDidBlurEditorWidget(() => {
      emit('blur')
      formItem.nTriggerFormBlur()
    })
    editorInst.value.onDidFocusEditorWidget(() => {
      emit('focus')
      formItem.nTriggerFormFocus()
    })
  }
}
watch(() => props.value, (val) => {
  if (val !== getValue())
    editorInst.value?.setValue(val ?? '')
})

watch(() => formItem.mergedDisabledRef.value, (value) => {
  editorInst.value?.updateOptions({ readOnly: value })
})

onMounted(initMonacoEditor)
onUnmounted(() => editorInst.value?.dispose())

const themes = useThemeVars()

defineExpose({ editorInst })
</script>

<template>
  <div
    ref="editorRef"
    class="h300px w-full rounded-base bd-base"
    :style="{
      borderColor: formItem.mergedStatusRef.value === 'error' ? themes.errorColor : undefined,
    }"
  />
</template>
