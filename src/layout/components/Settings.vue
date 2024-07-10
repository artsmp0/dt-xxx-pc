<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useDiscrete } from '@/composables/discrete'
import { useUIStore } from '@/stores/ui'

const show = defineModel<boolean>('show')

const UI = useUIStore()

const { copy } = useClipboard({
  legacy: true,
})

const { message } = useDiscrete()
async function handleCopy() {
  try {
    await copy(JSON.stringify(UI.defaultSetting, null, 2))
    message.success('拷贝配置成功！')
  }
  catch (error: any) {
    message.warning(error.msg)
  }
}
</script>

<template>
  <NDrawer v-model:show="show" :width="300">
    <NDrawerContent title="系统设置">
      <NDivider> 界面显示 </NDivider>
      <div flex="~ col gap-4">
        <div v-for="item in UI.settingMap" :key="item.key" flex="~ items-center justify-between">
          <span>{{ item.label }}</span>
          <NSwitch v-if="item.type === 'switch'" v-model:value="UI.defaultSetting[item.key]" />
          <NInputNumber v-else-if="item.type === 'inputNumber'" v-model:value="UI.defaultSetting[item.key]" :show-button="false" style="width: 150px">
            <template #suffix>
              PX
            </template>
          </NInputNumber>
          <NSelect v-else-if="item.type === 'select'" v-model:value="UI.defaultSetting[item.key]" style="width: 150px" :options="item.options" />
          <NInput v-else-if="item.type === 'input.textarea'" v-model:value="UI.defaultSetting[item.key]" type="textarea" style="width: 150px" />
          <NSelect v-else-if="item.type === 'theme'" v-model:value="UI.defaultSetting[item.key]" style="width: 150px" :options="UI.themeOptions" />
        </div>
      </div>
      <template #footer>
        <NAlert class="cursor-pointer" type="info" @click="handleCopy">
          单击此处复制配置，并粘贴到 src/config.json 中生效
        </NAlert>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
