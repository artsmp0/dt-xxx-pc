import type { ButtonProps, IconProps } from 'naive-ui'
import type { Component } from 'vue'

export interface AtIconProps {
  /** 针对 naive icon 的配置 */
  iconProps?: /* @vue-ignore */ Omit<IconProps, 'themeOverrides' | 'component'>
  /** 图标尺寸 */
  size?: string
  /** 是否旋转 */
  spin?: boolean
  /** 图标名称或者组件 */
  icon: string | Component
}

export interface AtIconButtonProps extends /* @vue-ignore */ ButtonProps {
  icon?: string | Component
  atIconProps?: Omit<AtIconProps, 'icon'>
}
