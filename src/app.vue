<template>
  <div>
    <NuxtLayout :name="layoutName"></NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const targetType = useDeviceType();
const layoutName = ref('pc-layout');
watchEffect(() => {
  if (router.currentRoute.value.path === '/404') {
    layoutName.value = 'null';
  } else {
    if (targetType.value === 'pc') {
      layoutName.value = 'pc-layout';
    } else if (targetType.value === 'mobile') {
      layoutName.value = 'mobile-layout';
    }
  }
});
useDeviceUrl();
</script>
