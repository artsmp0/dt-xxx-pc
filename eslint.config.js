import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  markdown: false,
  vue: {
    overrides: {
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false, ignores: ['micro-app'] },
      ],
      'vue/component-definition-name-casing': 'off',
    },
  },
  typescript: {
    overrides: {
      'no-restricted-syntax': 'off',
    },
  },
  ignores: ['src/assets/*'],
})
