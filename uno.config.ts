import { defineConfig, presetAttributify, presetIcons, presetUno, transformerAttributifyJsx, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives(), transformerAttributifyJsx()],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      info: 'var(--info-color)',
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      error: 'var(--error-color)',
    },
  },
  shortcuts: [
    {
      'rounded-base': 'rounded-[var(--border-radius)]',
      'bg-base': 'bg-[var(--card-color)]',
      'bg-modal': 'bg-[var(--modal-color)]',
      'text-base': 'text-[var(--text-color-1)]',
      'shadow-base': 'shadow-[--box-shadow-1]',
    },
    [/^bd-base(-[blrt])?$/, ([, c]) => `border-solid border-#efeff5  dark:border-#ffffff1a ${c ? `border${c}-1` : `border-1`} `],
    {
      'g-center': 'grid place-content-center',
      'f-center': 'flex items-center justify-center',
    },
  ],
})
