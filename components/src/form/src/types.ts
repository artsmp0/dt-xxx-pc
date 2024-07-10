import type {
  ButtonProps,
  CascaderProps,
  DatePickerProps,
  FormItemGiProps,
  FormProps,
  GridProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
  TreeSelectProps,
} from 'naive-ui'
import type { CSSProperties, Component, Ref, VNode } from 'vue'
import type { Recordable } from '../../types'
import type { AtMonacoEditorProps } from '../../monaco-editor'
import type { AtUploadProps } from '../../upload'
import type { AtFormItemConfig } from '..'

export interface AtFormProps {
  configs: FormItemConfig[]
  layout?: GridProps
  model: any
  initValue?: object
  scrollToFirstError?: boolean
  nFormProps?: Omit<FormProps, 'themeOverrides' | 'model'>
  titleBarCls?: string
}

export const needOmitKeyArr = ['themeOverrides', 'onUpdateValue', 'onUpdate:value', 'value', 'onChange'] as const
export type UnNeedKey = (typeof needOmitKeyArr)[number]
export interface FieldPropMap {
  input: Omit<InputProps, UnNeedKey>
  select: Omit<SelectProps, UnNeedKey>
  inputNumber: Omit<InputNumberProps, UnNeedKey>
  radio: Omit<RadioGroupProps, UnNeedKey> & { options: { label: string, value: number | string }[] }
  treeSelect: Omit<TreeSelectProps, UnNeedKey>
  datePicker: Omit<DatePickerProps, UnNeedKey>
  cascader: Omit<CascaderProps, UnNeedKey> & { loading?: boolean }
  monacoEditor: Omit<AtMonacoEditorProps, UnNeedKey>
  upload: Omit<AtUploadProps, UnNeedKey>
  custom: any
  multipleBlock: Omit<GridProps, 'themeOverrides'>
  titleBar: undefined
  switch: Omit<SwitchProps, UnNeedKey>
}
export type FieldType = keyof FieldPropMap

export interface OnChangeOption {
  value: any
  configs: Ref<AtFormItemConfig[]>
  index: number
  [key: string]: any
}

export type FormItemConfig = {
  [K in FieldType]: Omit<FormItemGiProps, 'label'> & {
    type: K
    field: string
    label?: string | (() => VNode)
    props?: FieldPropMap[K] & { style?: CSSProperties | string } & { onChange?: (options: OnChangeOption) => void }
    deps?: (string | Ref<any>)[]
    listener?: (apiFn?: Function) => void
    /** 是否在对依赖处理的时候需要深度监听 */
    deep?: boolean
    hide?: boolean
    children?: FormItemConfig[]
    /** 需要自动发起 api 请求的 */
    apiFn?: Function
    /** radio group 显示为 button */
    button?: boolean
    component?: Component
    /** 针对混合表单（数组） */
    multipleConfig?: {
      /** 添加一行的按钮文本 */
      addBtnText?: string
      addBtnProps?: Omit<ButtonProps, 'themeOverrides'>
      /** 表示数组至少要有几项 */
      limit?: number
      /** 默认取数组第一行作为初始值 */
      defaultItem?: object
      /** 点击添加一行按钮执行的回调函数 */
      onAddButtonClick?: (items: FormItemConfig[]) => boolean | void
      /** 点击每一项的删除按钮触发的回调函数 */
      onRemoveButtonClick?: (idx: number, items: FormItemConfig[], internalConfigs: Ref<FormItemConfig[][]>) => void | boolean
    }
  };
}[keyof FieldPropMap]

export interface FormItemElement {
  field: string
  widget: any
  props: FormItemConfig
  oldJson: FormItemConfig
}
export interface RenderFnParams {
  item: FormItemConfig
  model: Recordable
  internalConfigStates?: FormItemConfig[]
  index?: number
}
