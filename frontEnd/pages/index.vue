<template>
<el-container id="home">
  <el-empty id="nothing" description="(´・ω・`)">何もありません。<br>新規プロジェクトを作成しましょう</el-empty>
</el-container>
</template>

<style lang="scss" scoped>
#home{
  #nothing{
    width:100%;
  }
}
</style>
<script lang="ts">
// export default {
//   async asyncData({ $axios }) {
//     // AxiosによるHTTP通信 ...（1）
//     const res=await $axios.get('http://localhost:3001/lockerStatus')
//     return { lockerStatus: res.data }
//   },
//   data() {
//     return {
//       name: '北山本駅' // data ...（4）
//     }
//   }
// }
</script>