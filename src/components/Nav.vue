<template>
    <div class="nav">
      <el-menu router :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">电影</template>
          <el-menu-item v-for="(item,i) in navList1" :key="'1-'+i" :index="item.name">{{ item.navItem }}</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <!-- <el-menu-item v-for="(item,i) in navList1" :key="'1-'+i" :index="item.name">{{ item.navItem }}</el-menu-item> -->
          </el-submenu>
        </el-submenu>
        <!-- <el-menu-item index="2">处理中心</el-menu-item> -->
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4">
            <!-- <Login></Login> -->
            <div @click="logpopOpen" v-show="!user.login">登录/注册</div>
        </el-menu-item >
        <el-submenu index="/My" v-show="user.login">
          <template slot="title"><img class="userimg" :src="user.head_img"> {{user.role_name}}</template>
          <el-menu-item index="/My">个人中心</el-menu-item>
          <el-menu-item index="4-2" @click="userLogout"><div></div>退出登录</el-menu-item>
          <!-- <el-menu-item v-for="(item,i) in navList2" :key="'1-'+i" :index="item.name">{{ item.navItem }}</el-menu-item> -->
        </el-submenu>
      </el-menu>
    </div>
</template>
<style scoped="prototype">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .nav{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 768px;
  }
  /*.el-menu-item .is-active{
    color: #409EFF;
  }*/
  .userimg{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #DCDCDC;
  }
</style>
<script>
import Login from "../pages/login/login";
import Bus from '../assets/js/bus.js';
export default {
  components:{
    Login
  },
  data() {
    return {
      isCollapse: true,
      activeIndex: '1',
      activeIndex2: '1',
      user:{
        id:null,
        login:false,
        head_img:'https://zhengxin-pub.bj.bcebos.com/logopic/39fde3242b07bd0f96cb9db88897fdc8_fullsize.jpg@s_1,w_484,h_484',
        role_name:null
      },
      navmy:'/My',
      navList:[
        {name:'/',navItem:'电影'},
        {name:'/My',navItem:'消息中心'},
        {name:'/My',navItem:'个人中心'}
      ],
      navList1:[
        {name:'/Index',navItem:'主页'},
        {name:'/My1',navItem:'我的'},
      ],
      navList2:[
        {name:'/My1',navItem:'个人中心'},
        {name:'/',navItem:'注销登录'},
      ]
    };
  },
  created(){
    this.user.login=this.getCookieText("login");
    this.user.id=this.getCookieText("id");
    this.user.role_name=this.getCookieText("role_name");
    this.user.head_img=this.getCookieText("head_img");
  },
  mounted(){
    Bus.$on('login', (data) => {
      this.setCookie("login",data,10080);//设置cookie，有效时间为10080分钟，即7天。
      this.user.login = this.getCookieText("login");
    })
    Bus.$on('id', (data) => {
      this.setCookie("id",data,10080);//设置cookie，有效时间为10080分钟，即7天。
      this.user.id = this.getCookieText("id");
    })
    Bus.$on('role_name', (data) => {
      this.setCookie("role_name",data,10080);//设置cookie，有效时间为10080分钟，即7天。
      this.user.role_name = this.getCookieText("role_name");
    })
    Bus.$on('head_img', (data) => {
      this.setCookie("head_img",data,10080);//设置cookie，有效时间为10080分钟，即7天。
      this.user.id = this.getCookieText("head_img");
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },
    //打开弹窗
    logpopOpen(){
      this.$emit('logpopOpen',true);
    },
    //注销登录
    userLogout(){
      this.delCookie("login");
      this.delCookie("id");
      this.delCookie("role_name");
      this.delCookie("head_img");
      this.delCookie("collect_movie");
      if(sessionStorage.getItem("collect_movie")!=null){
       sessionStorage.removeItem("collect_movie");
      }
      this.user.login=this.getCookieText("login");
      this.$message({
        message:'已退出登录',
        type:'warning',
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
