import type { PopconfirmProps } from 'naive-ui'
import type { AtIconButtonProps } from '../../icon'

export interface AtConfirmProps {
  /** 二次确认消息 */
  message: string
  /** 触发按钮的属性 */
  buttonProps?: AtIconButtonProps
  /** NPopconfirm 的属性 */
  confirmProps?: /* @vue-ignore */ Omit<PopconfirmProps, 'onPositiveClick' | 'onNegativeClick'>
  /** 确认回调，支持异步 loading */
  onConfirm: () => Promise<any>
}
