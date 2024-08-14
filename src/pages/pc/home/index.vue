<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/store/index'
import {getCatPhoto} from '@/apis/globalApi'
const { globalData } = useStore()
const { keyDown } = UseKeyEvent()

const { locale, setLocale } = useI18n()
function registerKeyDown() {
  const passingKey = 'Enter'
    keyDown(passingKey)(() => {
    console.log('点击了')
    console.log(globalData.keyDownObj)
  })
}
console.log(useRuntimeConfig())
onMounted(() => {
  registerKeyDown()
  console.log('locale--language', locale.value)
  getcatPhotohander()
})
onUnmounted(() => {
  document.onkeydown = null
  const id='dwefdwe'
  setHnader(id)
})
const setHnader=(id:string)=>{
  console.log(id);

}
const getcatPhotohander= async()=>{
  const params={
    limit:1
  }
    const res=await getCatPhoto(params)
    console.log('数据',res);

}
</script>

<template>
  <div class="index_page">
    <button
      text-16px
      @click="setLocale('zh')"
    >
      切换中文
    </button>
    <button @click="setLocale('en')">
      切换英文
    </button>
    <p>{{ $t('menu.ecological') }}</p>
    <p>{{ $t('menu.home') }}</p>
    <div
      class="bg-no-repeat bgi-[mac-tab-bar/dianyin.svg]"
      costom-btn
      h-50px
      w-50px
    />
  </div>
</template>
