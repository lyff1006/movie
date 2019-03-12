<template>
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="(item,index) in movie_list" :key="index">
      <router-link  :to="{path:'detail',query:{title:item.title,img:item.images.large,id:item.id}}">
        <img :src="item.images.large">
      </router-link>
    </el-carousel-item>
  </el-carousel>
</template>
<script type="text/javascript">
  export default{
    name:'Carousel',
    data(){
      return{
        movie_list:[]
      }
    },
    created(){
      this.nowMovie();
    },
    methods:{
      nowMovie(){
        let that=this;
        let url=that.douban_api+"/v2/movie/in_theaters?count=10";
        that.axios.get(url)
        .then(res=>{
          //console.log(res.data.subjects);
          that.movie_list=res.data.subjects;
        })
      },
    }
  }
</script>
<style>
  .el-carousel img{
    position: relative;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .el-carousel__item:nth-child(2n) {
    
  }
  
  .el-carousel__item:nth-child(2n+1) {
    
  }
</style>