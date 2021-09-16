<template>
  <el-menu
    default-active="2"
    class="sidebar"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    ><nuxt-link to="/project/new">
      <el-menu-item index="1">
        <i class="sideIcon el-icon-circle-plus-outline"></i>
        <span>新規プロジェクト</span>
      </el-menu-item></nuxt-link
    >
    <el-menu-item index="2">
      <i class="sideIcon el-icon-menu"></i>
      <span>プロジェクト</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="sideIcon el-icon-document"></i>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="sideIcon el-icon-setting"></i>
      <span>設定</span>
    </el-menu-item>
  </el-menu>
</template>
<style lang="scss" scoped>
.sidebar {
  max-width: 240px;
  width: 240px;
  min-width: 210px;
  margin-top: 0;
  .sideIcon {
    font-size: 1.5rem;
    margin-right: 10px;
    color: #e8e8e8;
  }
  a {
    text-decoration: none;
    color: #ffd04b;
  }
}
</style>
