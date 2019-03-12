<template>
	<div class="main main-center">
		<div style="height: 60px"></div>
		<h1>落叶电影网</h1>
		<Carousel></Carousel>
		<div class="tag-list">
			<a v-for="(item,index) in tag_list" @click="changetag(item)" :key="index" :class="{'tag-list-active':item==tag}">
				{{item}}
			</a>
		</div>
		<el-row >
		  	<el-col class='movie-list-every' :span="6" v-for="(item,index) in movie_list" :key="index" >
			  	<router-link  :to="{path:'detail',query:{title:item.title,id:item.id}}">
				    <el-card :body-style="{ padding: '0px' }">
				      	<img v-bind:src="item.cover" :onerror="errorimg" :class="{'image1':1,'image-active':index==img_active}"  @mouseover="img_active=index" @mouseout="img_active=null">
				      	<div style="padding: 14px;">
				      		<div style="overflow: hidden;">
					      		<div class="title">{{item.title}}</div>
					        	<div class="rate">{{item.rate}}分</div>
				        	</div>
				      	</div>
				    </el-card>
				</router-link>
		  	</el-col>
		</el-row>
		<div>
		  	<el-pagination
			  	:page-size="page_limit"
			  	:page-count="8"
			  	layout="prev, pager, next"
			  	:total="400"
			  	:current-page="page"
			  	@current-change="handelPageChange" style="text-align: center;margin: 20px 0 50px 0;">
			</el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Nav from "../../components/Nav";
	import './index.css';
	import Totop from "../../components/totop";
	import Carousel from "../../components/Carousel";

	//import './index.sass'
	export default{
		name:"index",
		components:{
			Nav,
			Totop,
      		Carousel
		},
		data(){
			return{
				movie_list:[],
				currentPage:1,
				page_limit:40,
				page:1,
				tag:"热门",
				errorimg:"http://www.weblyff.cn/img/no_img.jpg",
				movie_search:"流浪地球",
				img_active:null,
				tag_list:["热门","最新","经典","动作","喜剧","爱情","科幻","悬疑","恐怖","文艺"],
				oldpage:1,
			}
		},
		created(){
			this.getMovieList(true);
			//console.log(this.movie_list)
			//this.search();
		},
		methods:{
			getMovieList:function(data){
				let that=this;
				let url=that.movie_api+'/douban.php';
				let loading=this.openLoding();
				that.axios.get(url,{params:{type:'movie',tag:this.tag,page_limit:this.page_limit,page:this.page}})
				.then(res=>{
					//console.log(res.data.page);
					if (res.data.data!='{"subjects":[]}') {
						this.pagesize=res.data.page_limit; 
						this.page=res.data.page;
						this.movie_list=JSON.parse(res.data.data).subjects;
						//console.log(this.movie_list);
						if(data!=true){
							document.body.scrollTop=window.screen.availHeight-180;
						}else{
							this.toTop();
						}
						loading.close();
					}else{
						loading.close();
						this.page=this.oldpage;
						alert("没有数据");
					}
					
				})
				.catch(err=>{
					loading.close();
					this.page=this.oldpage;
					alert("加载失败");
				});
				
			},
			handelPageChange(currentPage){
				this.oldpage=this.page;
				this.page=currentPage;
				//console.log(this.page);
				this.getMovieList();
			},
			toTop(){
				document.documentElement.scrollTop=document.body.scrollTop=0;
			},
			search(){
				let that=this;
				let url=that.douban_api+"/movie/search";
				that.axios.get(url,{params:{q:that.movie_search}})
				.then(res=>{
					console.log(res.data.subjects);
				})
			},
			openLoding() {
	        	const loading = this.$loading({
		          	lock: true,
		          	text: 'Loading',
		          	spinner: 'el-icon-loading',
		          	background: 'rgba(0, 0, 0, 0.7)'
	        	});
	        	return loading;
	        },
	        changetag(data){
	        	let that=this;
	        	that.tag=data;
	        	that.page=1;
	        	that.getMovieList();
	        }
		}
	}
</script>
<style lang="sass">
</style>
<style type="text/css">
	h1{
		text-align: center;
		font-size: 52px;
		color: #409EFF;
	}
	.tag-list{
		margin: 50px 30px 10px 30px;
	}
	.tag-list a{
		cursor: pointer;
	}
	.tag-list .tag-list-active{
		color: #409EFF;
	}
	.movie-list-every{
		box-sizing: border-box;
		padding: 20px 10px;
		position: relative;
	}
	.movie-list-every img{
		width: 100%;
		height: 380px;
		overflow: hidden;
	}
	.movie-list-every image1{
		
	}
	.movie-list-every .title{
		color: #666;
		width: 70%;
		overflow: hidden;
		float: left;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.movie-list-every .rate{
		float: left;
		width: 30%;
		color: #f00;
		text-align: right;
		overflow: hidden;
		font-weight: bolder;
		font-size: 20px;
	}
	.movie-list-every .button {
	    float: right;
	}
	.image-active{
		animation: imgactive 1s;
		animation-fill-mode: forwards;
	}
	@keyframes imgactive{
		0%{
			transform: scale(1);
		}
		100%{
			transform: scale(1.5);
		}
	}
</style>