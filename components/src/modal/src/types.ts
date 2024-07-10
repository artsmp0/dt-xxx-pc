export interface GpModalProps {
  /** Modal title */
  title?: string
  /** Modal width @default 800px */
  width?: number | string
  /** Whether to show the action */
  showAction?: boolean
  /** Only works when not using action slot @default undefined */
  confirmLoading?: boolean
  /** 是否可以拖拽 @default false */
  draggable?: boolean
  /** 是否显示全屏按钮 @default true */
  fullscreen?: boolean
  defaultFullscreen?: boolean
  /** 内容区样式 */
  contentCls?: string
  onBeforeClose?: () => boolean
}
