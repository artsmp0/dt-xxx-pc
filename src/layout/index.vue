<script setup lang="ts">
import Header from './components/Header.vue'
import Sider from './components/Sider.vue'
import Tabs from './components/Tabs.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
import { useUIStore } from '@/stores/ui'
import { usePermissionStore } from '@/stores/permission'

const permissionStore = usePermissionStore()
const include = computed(() => {
  return Array.from(permissionStore.cachedPages)
})

const UI = useUIStore()
const TAB_POSITION = computed(() => UI.defaultSetting.TAB_POSITION)
const SHOW_BREADCRUMB = computed(() => UI.defaultSetting.SHOW_BREADCRUMB)
const route = useRoute()
</script>

<template>
  <div class="relative h-full">
    <NLayout v-if="!route.query.isMicro" position="absolute">
      <Header />
      <NLayout has-sider position="absolute" style="top: 60px">
        <Sider />
        <NLayoutContent
          embedded
          :content-style="{
            overflow: 'hidden',
            height: 'full',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }"
        >
          <Tabs v-if="TAB_POSITION === 'alone'" />
          <div v-if="SHOW_BREADCRUMB && TAB_POSITION !== 'alone'" class="at-breadcrumb px4 py2">
            <Breadcrumbs />
          </div>
          <div class="relative w-full flex-1 of-auto">
            <div class="absolute inset-0 of-hidden">
              <RouterView>
                <template #default="{ Component }">
                  <Transition mode="out-in" :name="UI.defaultSetting.PAGE_ANIMATION">
                    <KeepAlive :include="include">
                      <Component :is="Component" />
                    </KeepAlive>
                  </Transition>
                </template>
              </RouterView>
            </div>
          </div>
        </NLayoutContent>
      </NLayout>
    </NLayout>
    <RouterView v-else>
      <template #default="{ Component }">
        <Transition mode="out-in" :name="UI.defaultSetting.PAGE_ANIMATION">
          <KeepAlive :include="include">
            <Component :is="Component" />
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>
