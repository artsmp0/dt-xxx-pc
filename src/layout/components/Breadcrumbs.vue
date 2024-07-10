<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type MenuItemType, usePermissionStore } from '@/stores/permission'
import { camel2kebab } from '@/utils'

const permissionStore = usePermissionStore()
const { flatMenuList } = storeToRefs(permissionStore)

const router = useRouter()
const route = useRoute()
const data = ref<MenuItemType[]>([])
function findRoutePath(targetPath: string) {
  const res = [] as MenuItemType[]
  const target = flatMenuList.value.find(m => m.path === targetPath)
  if (target) {
    res.unshift(target)
    if (target.parentPath)
      res.unshift(...findRoutePath(target.parentPath))
  }
  return res
}
watch(
  route,
  (v) => {
    data.value = findRoutePath(v.path)
  },
  { immediate: true },
)

function goto(menu: MenuItemType) {
  if (!menu.component)
    return
  router.push({ path: camel2kebab(menu.path) })
}
</script>

<template>
  <!-- 屏幕宽度小于 640 不显示面包屑 -->
  <div class="items-center hidden! sm:flex!">
    <div class="mt-1px">
      当前位置：
    </div>
    <NEllipsis class="at-breadcrumb">
      <NBreadcrumb v-if="data.length > 0" separator="/">
        <NBreadcrumbItem v-for="item in data" :key="item.path" :clickable="!!item.component" @click="goto(item)">
          {{ item.meta?.title }}
        </NBreadcrumbItem>
      </NBreadcrumb>
    </NEllipsis>
  </div>
</template>

<style lang="scss" scoped>
.n-breadcrumb {
    display: flex;
    align-items: center;

    :deep(.n-breadcrumb-item) {
        .n-breadcrumb-item__separator {
            margin: 0 2px;
            margin-bottom: 2px;
        }
    }
}
</style>
