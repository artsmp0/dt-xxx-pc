<script setup lang="tsx">
import { NAvatar, NText } from 'naive-ui'
import { useFullscreen } from '@vueuse/core'
import type { DropdownOption } from 'naive-ui/es/dropdown/src/interface'
import { AtIcon, AtIconBtn } from '@gupo-admin/components'
import Settings from './Settings.vue'
import { useUIStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'
import { isDdOrZzd } from '@/utils'
import { isDark, toggleDark } from '@/composables/theme'
import { useDiscrete } from '@/composables/discrete'

const isDev = computed(() => import.meta.env.DEV)
const userStore = useUserStore()
const UI = useUIStore()
const showSettings = ref<boolean>(false)

const SHOW_REFRESH_BTN = computed(() => UI.defaultSetting.SHOW_REFRESH_BTN)
const SHOW_THEME_BTN = computed(() => UI.defaultSetting.SHOW_THEME_BTN)
const SHOW_AVATAR = computed(() => UI.defaultSetting.SHOW_AVATAR)
const SHOW_FULLSCREEN_BTN = computed(() => UI.defaultSetting.SHOW_FULLSCREEN_BTN)

function reload() {
  location.reload()
}
const { toggle, isFullscreen } = useFullscreen(document.body)
const { dialog } = useDiscrete()

function renderCustomHeader() {
  return (
    <div class="flex items-center px4 py3">
      <NAvatar round class="mr3" src={userStore.userInfo?.img}></NAvatar>
      <div>
        <div>
          <NText depth={2}>{userStore.userInfo?.name || '打工仔'}</NText>
        </div>
        <div class="text-xs">
          <NText depth={3}>{userStore.userInfo?.phone || '毫无疑问，你是办公室里最亮的星'}</NText>
        </div>
      </div>
    </div>
  )
}

const userOptions = computed<DropdownOption[]>(() => {
  const options: DropdownOption[] = [
    {
      key: 'header',
      type: 'render',
      render: renderCustomHeader,
    },
  ]
  if (!isDdOrZzd()) {
    options.push({
      label: '退出登录',
      key: 'logout',
      icon: () => <AtIcon icon="i-ph-sign-out-duotone" />,
    })
  }
  return options
})
function logout() {
  dialog.warning({
    title: '退出系统',
    content: '你确定退出登录？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      userStore.logout()
    },
  })
}
function onSelect(key: string) {
  if (key === 'logout')
    logout()
}
</script>

<template>
  <div class="shrink-0" flex="~ items-center gap4">
    <AtIconBtn v-if="SHOW_REFRESH_BTN" secondary circle icon="i-ph-arrow-clockwise-duotone" @click="reload" />
    <AtIconBtn
      v-if="SHOW_FULLSCREEN_BTN"
      :icon="isFullscreen ? 'i-ph-arrows-in-duotone' : 'i-ph-arrows-out-duotone'"
      circle
      secondary
      @click="toggle"
    />
    <AtIconBtn
      v-if="SHOW_THEME_BTN && UI.curTheme.dark"
      :icon="isDark ? 'i-ph-moon-stars-duotone' : 'i-ph-sun-duotone'"
      circle
      secondary
      @click="toggleDark"
    />
    <AtIconBtn v-if="isDev" icon="i-ph-gear-six-duotone" circle secondary @click="showSettings = true" />
    <NDropdown v-if="SHOW_AVATAR && userStore.userInfo" :options="userOptions" @select="onSelect">
      <NAvatar round :src="userStore.userInfo?.img" />
    </NDropdown>
    <Settings v-model:show="showSettings" />
  </div>
</template>
