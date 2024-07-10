import type { RemovableRef, UseStorageOptions } from '@vueuse/core'
import { useLocalStorage as useVueuseLocalStorage, useSessionStorage as useVueuseSessionStorage } from '@vueuse/core'
import { isDev } from '@/utils'

export function createStore(key: string, options?: UseStorageOptions<any> & { crypto?: boolean }) {
  const storageOptions: UseStorageOptions<any> = {
    serializer: {
      read(raw) {
        if (!raw)
          return null
        if (options?.crypto) {
          return JSON.parse(decodeURIComponent(window.atob(raw)))
        }
        return JSON.parse(raw)
      },
      write(raw) {
        if (options?.crypto) {
          return window.btoa(encodeURIComponent(JSON.stringify(raw)))
        }
        return JSON.stringify(raw)
      },
    },
    ...options,
  }

  const centerLocalStore = useVueuseLocalStorage(key, {}, storageOptions)
  const centerSessionStore = useVueuseSessionStorage(key, {}, storageOptions)
  const useSessionStorage = <T>(key: string, initValue: T) => {
    if (!centerSessionStore.value[key]) {
      centerSessionStore.value[key] = initValue
    }
    return toRef(centerSessionStore.value, key) as RemovableRef<T>
  }
  const useLocalStorage = <T>(key: string, initValue: T) => {
    if (!centerLocalStore.value[key]) {
      centerLocalStore.value[key] = initValue
    }
    return toRef(centerLocalStore.value, key) as RemovableRef<T>
  }

  return {
    useLocalStorage,
    useSessionStorage,
  }
}

const { useLocalStorage, useSessionStorage } = createStore(import.meta.env.VITE_APP_STORAGE_KEY, { crypto: !isDev() })

export {
  useLocalStorage,
  useSessionStorage,
}
