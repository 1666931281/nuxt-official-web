<template>
  <nuxtLayout :name="layoutName">
    <NuxtPage />
  </nuxtLayout>
</template>
<script setup>
  // 当前设备的类型
  const targetType = useDeviceType().value;
  const layoutName = ref('');
  if (targetType == 'pc') {
    layoutName.value = 'pc/default';
  } else if (targetType == 'mobile') {
    layoutName.value = 'mobile/default';
  }
</script>
<style>
  @import url(./assets/css/global.scss);
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }

</style>
