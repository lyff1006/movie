<template>
  <div id="app">
    <Bg v-show="logpopShow"></Bg>
    <Logpop v-show="logpopShow" @logpopClose="changepopshow"></Logpop>
    <Nav @logpopOpen="changepopshow"></Nav>
    <Totop></Totop>
    <keep-alive>     <!--使用keep-alive会将页面缓存-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> 
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import Nav from "./components/Nav";
  import Index from "./pages/index/index";
  import Totop from "./components/totop";
  import Bg from "./components/Bg";
  import Logpop from "./components/logpop";
  export default {
    name: 'App',
    components:{
      Nav,
      Index,
      Totop,
      Bg,
      Logpop
    },
    data(){
      return{
        logpopShow:false
      }
    },
    methods:{
      changepopshow(data){
        this.logpopShow=data;
      }
    }
  }
</script>

<style>
*{
  font-size: 16px;
}
html{
  height:100%;
}
body{
  height:100%;
  margin: 0;
}
#app{
  height: 100%;
}
a{
  text-decoration: none;
}
.main {
  width: 1080px;
}
.blue-btn{
  background: #409EFF;
  color: #fff;
  text-align: center;
  padding: 3px 8px;
  cursor: pointer;
  font-weight: normal;
  border-radius: 3px;
}
.red-btn{
  background: #ff4040;
  color: #fff;
  text-align: center;
  padding: 3px 8px;
  cursor: pointer;
  font-weight: normal;
  border-radius: 3px;
}
.green-btn{
  background: #71c671;
  color: #fff;
  text-align: center;
  padding: 3px 8px;
  cursor: pointer;
  font-weight: normal;
  border-radius: 3px;
}
@media screen and (min-width: 1080px) {
.main-center{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
}
    
}
@media screen and (max-width: 1080px) {
  .main-center{
    position: absolute;
    left: 0;
    transform: translateX(0);
    box-sizing: border-box;
  }
}

</style>
