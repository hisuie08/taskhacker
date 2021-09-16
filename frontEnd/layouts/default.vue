<template>
  <el-container direction="vertical">
    <el-header id="globalHeader" height="70px">
      <nuxt-link to="/"><h1>TaskHacker</h1></nuxt-link>
    </el-header>
    <el-main id="mainbody">
      <Sidebar class="mainWrapper" />
      <Nuxt class="mainWrapper" />
    </el-main>
  </el-container>
</template>
<style lang="scss">
body {
  margin: 0;
  header#globalHeader {
    background-color: #444b52;
    display: flex;
    h1 {
      display: inline-block;
      margin: 0;
      font-size: 2rem;
      line-height: 72px;
      color: #ffd04b;
    }
  }
  #mainbody {
    padding: 0;
    display: flex;
    position: relative;
    height: calc(100vh - 70px);
    width: 100vw;
  }
}
</style>
