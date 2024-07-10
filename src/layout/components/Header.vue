<script setup lang="tsx">
import HeaderOptions from './HeaderOptions.vue'
import Tabs from './Tabs.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import logo from '@/assets/imgs/logo.png'
import { useUIStore } from '@/stores/ui'

// 设置
const UI = useUIStore()
const TAB_POSITION = computed(() => UI.defaultSetting.TAB_POSITION)
const SHOW_BREADCRUMB = computed(() => UI.defaultSetting.SHOW_BREADCRUMB)
</script>

<template>
  <NLayoutHeader class="h15 w-full of-hidden pr5" flex="~ items-center" bordered>
    <div class="hidden md:flex" :style="{ width: `${UI.defaultSetting.SIDE_WIDTH}px` }" flex="justify-center items-center shrink-0">
      <img :src="logo" alt="LOGO" class="w-37.5">
    </div>
    <div class="ml--0.25 h-full min-w-0 flex-1 pr6">
      <Tabs v-if="TAB_POSITION === 'top'" />
      <div v-else-if="SHOW_BREADCRUMB" class="h-full flex items-center">
        <Breadcrumbs />
      </div>
    </div>
    <HeaderOptions class="ml-auto shrink-0" />
  </NLayoutHeader>
</template>
