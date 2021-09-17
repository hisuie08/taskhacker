<template>
<el-form id="newProjectform" ref="form" :model="project" label-width="120px">
    <h1>新規プロジェクト</h1>
<el-form-item label="プロジェクト名">
    <el-input v-model="project.name"></el-input>
  </el-form-item>
  <el-form-item label="メンバー">
    <el-select v-model="project.members" placeholder="メンバー">
    </el-select>
  </el-form-item>
  <el-form-item label="備考や説明">
    <el-input type="textarea" v-model="project.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
    </el-form>
</template>
<script lang="ts">
  export default {
    data() {
      return {
        project: {
          name: '',
          members: [],
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log({project:this});
      }
    }
  }
</script>
<style lang="scss" scoped>
#newProjectform{
    padding:20px;
}
</style>