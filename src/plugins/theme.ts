export default defineNuxtPlugin((nuxtApp) => {
  const { theme } = useTheme();

  // 将主题应用到整个 HTML 元素上
  document.documentElement.classList.add(theme.value);

  // 监听主题变化,更新 HTML 元素的主题类
  nuxtApp.hook('page:finish', () => {
    document.documentElement.classList.replace(theme.value, theme.value);
  });
});
