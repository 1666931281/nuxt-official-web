<template>
  <div class="index_page">
    <button
      @click="setLocale('zh')"
      text-16px
    >
      切换中文
    </button>
    <button @click="setLocale('en')">切换英文</button>
    <p>{{ $t('menu.ecological') }}</p>
    <p>{{ $t('menu.home') }}</p>
    <div
      class="bg-no-repeat bgi-[mac-tab-bar/dianyin.svg]"
      costom-btn
      h-50px
      w-50px
    ></div>
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
console.log(useRuntimeConfig());

onMounted(() => {
  registerKeyDown();
  console.log('locale--language', locale.value);
});
onUnmounted(() => {
  document.onkeydown = null;
});
</script>
