import type { GlobalThemeOverrides } from 'naive-ui'
import { normal } from './default'
import { antd } from './antd'

export type AtTheme = 'default' | 'antd'

export interface ThemeContent {
  dark?: GlobalThemeOverrides
  light: GlobalThemeOverrides
}

export type ThemeMap = Record<AtTheme, ThemeContent>

export const THEME_MAP: ThemeMap = {
  default: normal,
  antd,
}
