<template>
  <div class="index_page">
    <button class="bgi-[mac-tab-bar/dianyin.svg]">按钮</button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store/index';
const { globalData } = useStore();
const { keyDown } = UseKeyEvent();

const registerKeyDown = () => {
  const passingKey = 'Enter';
  keyDown(passingKey)(() => {
    console.log('点击了');
    console.log(globalData.keyDownObj);
  });
};
onMounted(() => {
  registerKeyDown();
});
onUnmounted(() => {
  document.onkeydown = null;
});
</script>
<style lang="scss" scoped>
.index_page {
  position: relative;
  height: 100vh;
}
.tab_bar {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
}
</style>
