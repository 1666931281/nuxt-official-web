<template>
  <div class="index_page">
    <button
      class="bgi-[mac-tab-bar/dianyin.svg]"
      @click="setLocale('zh')"
    >
      切换中文
    </button>
    <button @click="setLocale('en')">切换英文</button>
    <p>{{ $t('menu.ecological') }}</p>
    <p>{{ $t('menu.home') }}</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store/index';
const { globalData } = useStore();
const { keyDown } = UseKeyEvent();

const { locale, setLocale } = useI18n();
const registerKeyDown = () => {
  const passingKey = 'Enter';
  keyDown(passingKey)(() => {
    console.log('点击了');
    console.log(globalData.keyDownObj);
  });
};
onMounted(() => {
  registerKeyDown();
  console.log('locale--language', locale.value);
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
