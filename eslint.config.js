import withNuxt from './.nuxt/eslint.config.mjs';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default withNuxt([
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
      ecmaVersion: 'latest',
      parser: tseslint.parser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'], // Vue3
  {
    files: ['app.vue', 'error.vue', 'pages/**/*.vue', 'layouts/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off', //关闭检测vue文件多单词命名
      '@typescript-eslint/no-explicit-any': ['off'], //关闭对typescript类型为any的检测
      'no-undef': 'off', //更好地识别和检查 Vue 文件中的 composables 函数，而不会报错"'xxx' is not defined"。
    },
  },
  { ignores: ['.nuxt/'] }, // 忽略校验 .nuxt/ 目录下的所有文件
]);
