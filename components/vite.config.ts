/// <reference types="vitest" />

import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const iconDirs = [fileURLToPath(new URL('./src/svg', import.meta.url))]
const componentIndex = fileURLToPath(new URL('./src/index.ts', import.meta.url))
const preserveModulesRoot = fileURLToPath(new URL('./src', import.meta.url))
const outputEs = fileURLToPath(new URL('./es', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({ configFile: '../uno.config.ts' }),
    createSvgIconsPlugin({ iconDirs, symbolId: 'icon-[dir]-[name]', customDomId: '__@art-admin/components__svg__icons__dom__' }),
    dts({ outDir: outputEs }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: componentIndex,
    },
    rollupOptions: {
      external: [
        'vue',
        /^naive-ui/,
        'vue-router',
        'lodash-unified',
        '@vueuse/core',
        'sortablejs',
        '@monaco-editor/loader',
      ],
      output: [
        {
          format: 'esm',
          dir: outputEs,
          exports: undefined,
          preserveModules: true,
          preserveModulesRoot,
          entryFileNames: `[name].mjs`,
        },
      ],
    },
  },
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,
    // 模拟 DOM 环境
    environment: 'jsdom',
  },
})
