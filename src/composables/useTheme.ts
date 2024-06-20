const currentTheme = ref<'light-theme' | 'dark-theme'>('light-theme');

export const useTheme = () => {
  const { provide, inject: any } = useNuxtApp();

  const toggleTheme = () => {
    currentTheme.value =
      currentTheme.value === 'light-theme' ? 'dark-theme' : 'light-theme';
    provide('curTheme', currentTheme.value);
  };

  const theme = computed(() => inject('curTheme', currentTheme.value));

  return {
    toggleTheme,
    theme,
  };
};
