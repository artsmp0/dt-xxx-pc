/*
 假设你的项目中没有使用到某几个api，这边可以注释，以便于减小包体积
 特别是代码编辑器这种重体积的表单项
*/
import type { Component } from 'vue'
import type { FieldType } from '../types'
import { renderInput } from './input'
import { renderSwitch } from './switch'
import { renderInputNumber } from './input-number'
import { renderSelect } from './select'
import { renderRadio } from './radio'
import { renderTreeSelect } from './tree-select'
import { renderDatePicker } from './date-picker'
import { renderCascader } from './cascader'
import { renderMonacoEditor } from './monaco-editor'
import { renderMultipleBlock } from './multiple-block'
import { renderUpload } from './upload'
import { renderCustom } from './custom'

export const FORM_FIELDS: Record<FieldType, Component | null> = {
  input: renderInput,
  switch: renderSwitch,
  inputNumber: renderInputNumber,
  select: renderSelect,
  cascader: renderCascader,
  datePicker: renderDatePicker,
  treeSelect: renderTreeSelect,
  radio: renderRadio,
  upload: renderUpload,
  monacoEditor: renderMonacoEditor,
  multipleBlock: renderMultipleBlock,
  custom: renderCustom,
  titleBar: null,
}
