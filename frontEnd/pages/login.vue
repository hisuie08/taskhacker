<template>
<el-form :model="user" ref="user">
    <el-form-item label="ユーザー名">
    <el-input v-model="user.name"></el-input>
  </el-form-item>
  <el-form-item label="パスワード">
      <el-input type="password" v-model="user.passwd"></el-input>
  </el-form-item>
  <el-button type="primary" @click="submit">ログイン</el-button>
</el-form>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend(
    {
    data(){
        return {user:{name: "",passwd:""}}
    },
    methods:{
        async submit(){
          const result = this.$axios.$post("http://localhost:3020/api/user/login",JSON.stringify({name:this.user.name,passwd:this.user.passwd}))
          console.log(result)
        }
    }
}
)
</script>