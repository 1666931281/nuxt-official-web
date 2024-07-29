<template>
  <div class="index_page">
    <button class="bgi-[mac-tab-bar/dianyin.svg]">按钮</button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
// import { getContentListByChannel } from "@/apis/globalApi";

// 图文资讯信息接口查询参数
// const pictureQuery = ref({
//   order: 3,
//   ingame_channel_id: 138,
//   start: 1,
//   num:4,
//   game: 'esports',
// });
// const dataList=ref({})
onMounted(() => {
  //  getData()
});
// const getData = async()=>{
//    const res=await getContentListByChannel(pictureQuery.value)
//    dataList.value=res.data
// }
//     const handerClick=()=>{
//         pictureQuery.value.start+=1
//       getData()
//     }
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
