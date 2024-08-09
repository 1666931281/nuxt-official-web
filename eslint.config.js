import antfu from '@antfu/eslint-config';

export default antfu({
  unocss: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  formatters: true,
});
