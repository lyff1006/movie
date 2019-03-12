<template>
  <div>
    <el-button v-if="login!=true" type="text" @click="open2">登录/注册</el-button>
    <div v-else>
      <img class="userimg" :src="userimg">
    </div>
  </div>
</template>
<style type="text/css">
  .userimg{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #409EFF;
  }
</style>
<script>
  export default {
    data(){
      return{
        login:false,
        userimg:'https://zhengxin-pub.bj.bcebos.com/logopic/39fde3242b07bd0f96cb9db88897fdc8_fullsize.jpg@s_1,w_484,h_484'
      }
    },
    methods: {
      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>