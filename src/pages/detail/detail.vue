<template>
	<div class="main main-center detail">
		<div style="height: 60px;"></div>
		<div class="detail_title">{{data.title}}</div>
		<div class="detail_info">
			<transition name="info_img">
				<div class="info_img">
					<img v-bind:src="img" width="100%">
				</div>
			</transition>
			<div class="info_text">
				<InfoImgArray v-bind:list="data.directors" v-bind:id="id[0]"></InfoImgArray>
				<InfoImgArray v-bind:list="data.casts" v-bind:id="id[1]"></InfoImgArray>
				<InfoArray v-bind:list="data.genres" v-bind:id="id[2]"></InfoArray>
				<InfoArray v-bind:list="data.countries" v-bind:id="id[3]"></InfoArray>
				<div style="margin: 10px 0">
					豆瓣评分：
					<el-rate
					  v-model="average"
					  disabled
					  show-score
					  text-color="#ff9900"
					  :max=10
					  allow-half
					  score-template="{value}">
					</el-rate>
				</div>
				<!-- <InfoText v-bind:list="average" v-bind:id="id[4]"></InfoText> -->
				<!-- <InfoText v-bind:list="data.duration" v-bind:id="id[5]"></InfoText> -->
				<InfoText v-bind:list="data.year" v-bind:id="id[6]"></InfoText>
				<div style="margin: 20px 0" v-if="root_url.url_1!=null">
					播放路径：
					<a target="blank" v-for="(item,index) in root_url" :key="index" :class="{'play-btn-hover':index==hoverIndex,'play-btn':1}" v-bind:href="item" @mouseover="hoverIndex=index" @mouseout="hoverIndex=null">云播</a>
				</div>
				<div style="margin: 20px 0" v-else>
					播放路径：加载中
				</div>
				<div style="margin: 20px 0">
					收藏影片：
					<span :class="{'play-btn':collect=='collect','pointer':collect=='collect','play-btn-hover':collect==hoverIndex,'alreadbtn-btn':collect=='alreadyCollect'}" @mouseover="hoverIndex='collect'" @mouseout="hoverIndex=null" @click="movieCollect">
						<span v-if="collect=='collect'">加入收藏</span>
						<span v-else>已收藏</span>
					</span>
				</div>
				<div >{{id[7]}}</div>
				<div class="short-comment">{{short_comment}}</div>
			</div>
			<div class="info_comment"></div>
		</div>
	</div>
</template>
<style type="text/css">
	.detail{
		padding: 20px 30px;
	}
	.detail_title{
		font-size: 32px;
		color: #666;
	}
	.detail_info{
		overflow: hidden;
		margin: 20px 0;
	}
	.detail_info .info_img{
		padding: 0px 30px;
		width: 25%;
		float: left;
	}
	.detail_info .info_text{
		border: 1px solid #666;
		border-radius: 10px;
		padding: 16px;
		width: 50%;
		float: left;
	}
	.detail_info .info_comment{
		width: 25%;
		float: left;
	}
	.detail_info .play-btn{
		color: #fff;
		background: #409EFF;
		padding: 5px 15px;
		border-radius: 30px;
		margin-right: 20px;
	}
	.detail_info .play-btn-hover{
		color: #fff;
		background: #077df7;
		padding: 5px 15px;
		border-radius: 30px;
		margin-right: 20px;
	}
	.detail_info .alreadbtn-btn{
		color: #fff;
		background: #666;
		padding: 5px 15px;
		border-radius: 30px;
		margin-right: 20px;
	}
	.detail_info .short-comment{
		margin-top: 10px;
		text-indent: 2em;
		color: #ae8609;
	}
	.pointer{
		cursor: pointer;
	}
</style>
<script type="text/javascript">
	import InfoText from '../../components/infotext'
	import InfoArray from '../../components/infoarray'
	import InfoImgArray from '../../components/infoimgarray'
	export default{
		name:'detail',
		components:{
			InfoText,
			InfoArray,
			InfoImgArray
		},
		data(){
			return{
				title:this.$route.query.title,
				data:[],
				root_url:[],
				img:"",
				id:['导演','主演','类型','制片国家/地区','豆瓣评分','片长','上映时间','影片简介'],
				short_comment:[],
				hoverIndex:null,
				commonIndex:null,
				collect:'collect',
				average:null,
				max_rate:10
			}
		},
		created(){
			this.getMovieDetail();
			this.getMovieUrl();
			this.getCollectMovie();
		},
		methods:{
			//获取详细的电影信息
			getMovieDetail:function(){
				let that=this;
				let url=that.movie_api+'/detail.php';
				let movie_url=this.douban_api+"/v2/movie/subject/"+this.$route.query.id;
				let loading=that.openLoding();
				this.axios.get(movie_url).then(res=>{
					this.data=res.data;
					this.average=this.data.rating.average;
					this.short_comment=this.data.summary;
					this.img=this.data.images.large;
					loading.close();
				}).catch(err=>{
					loading.close();
					alert("电影信息加载失败")
				});
				
				/*that.axios.get(url,{params:{subject_id:this.$route.query.id}}).then(res=>{
					this.data=res.data.subject;
					this.short_comment=this.data.short_comment;
					this.img=this.data.images.large;
					//console.log("img"+this.img);
					console.log(this.data);
					loading.close();
				}).catch(err=>{
					loading.close();
					alert("电影信息加载失败")
				})*/
			},
			//获取电影播放地址
			getMovieUrl:function(){
				let that=this;
				let url=that.movie_api+'/kanxi.php';
				that.axios.get(url,{params:{keyword:$URL.encode(this.$route.query.title)}}).then(res=>{
					//console.log(res.data);
					that.root_url=res.data;
					/*this.movie_list=JSON.parse(res.data.data).subjects;
					console.log(this.movie_list);*/
				}).catch(err=>{
					alert("播放路径加载失败");
				})
			},
			//加载动画
			openLoding() {
	        	const loading = this.$loading({
		          	lock: true,
		          	text: 'Loading',
		          	spinner: 'el-icon-loading',
		          	background: 'rgba(0, 0, 0, 0.7)'
	        	});
	        	return loading;
	        },
	        //电影收藏
	        movieCollect(){
	        	let that=this;
	        	let user_id=this.getCookieText('id');
	        	if(that.collect=='collect'&&user_id!=''){
	        		let userId=that.getCookieText('id');
		        	let movieId=that.$route.query.id;
		        	let movieTitle=that.data.title;
		        	let collectId=userId+movieId;
		        	let url=that.xyz_api+"/movie/public/Operate/movieCollect.php";
		        	that.axios.post(url,
	        		{
	        			user_id:userId,
	        			movie_title:movieTitle,
	        			movie_id:movieId,
	        			collect_id:collectId
	        		},{emulateJSON:true})
	        		.then(res=>{
	        			if(res.data.code==1){
	        				that.collect="alreadyCollect";
	        				this.updateCollect();
	        				this.$message({
	        					message:"收藏成功！",
	        					type:"success",
	        				})
	        			}
	        		})
	        	}else{
	        		this.$message({
    					message:"请先登录！",
    					type:"warning",
    				})
	        	}
	        },
	        //获取缓存中的电影收藏信息
	        getCollectMovie(){
	        	let movie_list=JSON.parse(sessionStorage.getItem("collect_movie"));
	        	console.log(movie_list);
	        	let that=this;
	        	if(movie_list!=null){
	        		for (var i = movie_list.length - 1; i >= 0; i--) {
		        		if(movie_list[i].movie_id==this.$route.query.id){
		        			this.collect="alreadyCollect";
		        		}
		        	}
	        	}
	        },
	        //更新缓存中的电影收藏信息
	        updateCollect(){
	        	let that=this;
				let id=this.getCookieText("id");
				let url=this.xyz_api+'/movie/public/Operate/userCollect.php';
				this.axios.post(url,{id:id},{emulateJSON:true}).then(res=>{
					sessionStorage.setItem('collect_movie',JSON.stringify(res.data.data));
				})
	        }
		}
	}
</script>
