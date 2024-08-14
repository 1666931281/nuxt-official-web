<script setup lang="ts">
const router = useRouter()
const targetType = useDeviceType()
const layoutName =  ref<any>('pc-layout')
watchEffect(() => {
  if (router.currentRoute.value.path === '/404') {
    layoutName.value = 'null'
  }
  else {
    if (targetType.value === 'pc') {
      layoutName.value = 'pc-layout'
    }
    else if (targetType.value === 'mobile') {
      layoutName.value = 'mobile-layout'
    }
  }
})
useDeviceUrl()
</script>

<template>
  <div>
    <NuxtLayout :name="layoutName" />
  </div>
</template>
