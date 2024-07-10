import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import EnvTypes from 'vite-plugin-env-types'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'

const iconDirs = [fileURLToPath(new URL('./src/assets/icons', import.meta.url)), fileURLToPath(new URL('./components/src/svg', import.meta.url))]
const srcDir = fileURLToPath(new URL('./src', import.meta.url))
const componentDir = fileURLToPath(new URL('./components/src', import.meta.url))
const envDir = fileURLToPath(new URL('env', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { VITE_PUBLIC_PATH } = loadEnv(config.mode, envDir) as any
  return {
    base: VITE_PUBLIC_PATH,
    envDir,
    resolve: { alias: { '@': srcDir, '@gupo-admin/components': componentDir } },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 注册自定义组件micro-app 防止控制台警告
            isCustomElement: tag => tag.startsWith('micro-app'),
          },
        },
      }),
      vueJsx(),
      UnoCSS(),
      EnvTypes({ dts: './types/env.d.ts' }),
      createSvgIconsPlugin({ iconDirs, symbolId: 'icon-[dir]-[name]' }),
      Components({ dts: './types/components.d.ts', dirs: ['src/components', componentDir], extensions: ['vue', 'tsx', 'jsx'], resolvers: [NaiveUiResolver()] }),
      AutoImport({
        dts: './types/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] },
        ],
      }),
    ],
  }
})
