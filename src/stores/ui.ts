import { defineStore } from 'pinia'
import { store } from '.'
import setting from '@/config.json'
import type { AtTheme } from '@/composables/theme/config'
import { THEME_MAP } from '@/composables/theme/config'

type SettingKey = keyof typeof setting

export const useUIStore = defineStore('ui', () => {
  const defaultSetting = ref<Record<SettingKey, any>>(setting)
  const curTheme = computed(() => THEME_MAP[defaultSetting.value.CUR_THEME as AtTheme])

  const themeOptions: { label: AtTheme, value: AtTheme }[] = [
    { label: 'default', value: 'default' },
    { label: 'antd', value: 'antd' },
  ]

  const settingMap = ref<
        {
          key: SettingKey
          label: string
          type: 'switch' | 'select' | 'inputNumber' | 'input' | 'input.textarea' | 'theme'
          options?: { label: string, value: string }[]
        }[]
    >([
      {
        key: 'CUR_THEME',
        label: '主题',
        type: 'theme',
      },
      {
        key: 'SHOW_AVATAR',
        label: '头像',
        type: 'switch',
      },
      {
        key: 'SHOW_BREADCRUMB',
        type: 'switch',
        label: '面包屑',
      },
      {
        key: 'SHOW_FULLSCREEN_BTN',
        type: 'switch',
        label: '全屏按钮',
      },
      {
        key: 'SHOW_REFRESH_BTN',
        type: 'switch',
        label: '刷新按钮',
      },
      {
        key: 'SHOW_THEME_BTN',
        type: 'switch',
        label: '主题按钮',
      },
      {
        key: 'STORAGE_TAB',
        type: 'switch',
        label: '持久化页签',
      },
      {
        key: 'TAB_POSITION',
        type: 'select',
        label: '标签栏',
        options: [
          { label: '单独一行', value: 'alone' },
          { label: '顶部', value: 'top' },
          { label: '隐藏', value: 'hidden' },
        ],
      },
      {
        key: 'SIDE_WIDTH',
        type: 'inputNumber',
        label: '边栏宽度',
      },
      {
        key: 'PAGE_ANIMATION',
        label: '过渡动画',
        type: 'select',
        options: ['fade', 'fade-up', 'fade-down', 'fade-slide', 'fade-scale'].map(value => ({
          value,
          label: value,
        })),
      },
    ])

  return { defaultSetting, settingMap, curTheme, themeOptions }
})

export function useUIStoreWithOut() {
  return useUIStore(store)
}
