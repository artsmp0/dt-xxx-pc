import { type ConfigProviderProps, createDiscreteApi, darkTheme } from 'naive-ui'
import { isDark } from './theme'
import { useUIStoreWithOut } from '@/stores/ui'

const UI = useUIStoreWithOut()
const themeOverrides = computed<any>(() => {
  return isDark.value ? UI.curTheme.dark : UI.curTheme.light
})

const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  themeOverrides: themeOverrides.value,
  theme: isDark.value ? darkTheme : null,
}))

const { message, notification, dialog, loadingBar, modal } = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar', 'modal'], {
  configProviderProps: configProviderPropsRef,
})

export function useDiscrete(): Omit<ReturnType<typeof createDiscreteApi>, 'app' | 'unmount'> {
  return {
    message,
    notification,
    dialog,
    loadingBar,
    modal,
  }
}
