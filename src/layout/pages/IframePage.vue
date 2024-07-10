<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const route = useRoute()

const userStore = useUserStore()
const src = computed(() => {
  return `${route.meta.iframe}?system_code=${route.meta.microName}&org_id=${userStore.orgId}&token=${userStore.token}&isMicro=1`
})
</script>

<template>
  <div class="h-full w-full">
    <iframe class="h-full w-full border-none" :src="src" />
  </div>
</template>
