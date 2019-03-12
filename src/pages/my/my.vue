<template >
	<div class="main main-center" >
		<div style="height: 100px;background: #f2f2f3;"></div>
		<div>
			<el-tabs tab-position="left" style="height:1500px;background: #f2f2f3;padding: 20px 10px;">
			    <el-tab-pane label="用户管理">
			    	<el-breadcrumb separator=">">
					  	<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					  	<el-breadcrumb-item>个人中心</el-breadcrumb-item>
					  	<el-breadcrumb-item>用户管理</el-breadcrumb-item>
					</el-breadcrumb>
					<div class="user-info">
						<div class="user-img">
							<div class="user-headimg">
								<img v-bind:src="user.head_img">
							</div>
							<div v-show="true">
								<div class="blue-btn" style="margin-top: 10px;">更改头像</div>
    							<input type="file" class="file_headimg" accept="image/*" @change="editHeadimg($event)"/>
							</div>
						</div>
				  		<div class="user-detail">
				  			<div class="user-detail-name">
				  				<UserEdit index="role_name" v-bind:data="user.role_name" v-bind:edit="edit.role_name" v-on:editReturn="editReturn" v-on:editCancel="editCancel"></UserEdit>
				  				<span class="blue-btn" v-show="!edit.role_name" @click="edit.role_name=true">编辑</span>
				  			</div>
				  			<div class="user-detail-every">
				  				QQ:<UserEdit index="qq" v-bind:data="user.qq" v-bind:edit="edit.qq" v-on:editReturn="editReturn" v-on:editCancel="editCancel"></UserEdit> 
				  				<span class="blue-btn" v-show="!edit.qq" @click="edit.qq=true">编辑</span>
				  			</div>
				  			<div class="user-detail-every">
				  				电话：<UserEdit index="phone" v-bind:data="user.phone" v-bind:edit="edit.phone" v-on:editReturn="editReturn" v-on:editCancel="editCancel"></UserEdit> 
				  				<span class="blue-btn" v-show="!edit.phone" @click="edit.phone=true">编辑</span>
				  			</div>
				  			<div class="user-detail-every">
				  				账号：{{user.account}}
				  			</div>
				  		</div>
				  	</div>
				</el-tab-pane>
			    <el-tab-pane label="配置管理">
			    	<el-breadcrumb separator=">">
					  	<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					  	<el-breadcrumb-item>个人中心</el-breadcrumb-item>
					  	<el-breadcrumb-item>配置管理</el-breadcrumb-item>
					</el-breadcrumb>
			    </el-tab-pane>
			    <el-tab-pane label="收藏/历史">
			    	<el-breadcrumb separator=">">
					  	<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					  	<el-breadcrumb-item>个人中心</el-breadcrumb-item>
					  	<el-breadcrumb-item>收藏/历史</el-breadcrumb-item>
					</el-breadcrumb>
					<el-collapse accordion style="margin-top: 30px">
					  	<el-collapse-item>
					  		<template slot="title">
					      		<div style="font-size: 24px;color: #409EFF;margin: 10px 0">我的收藏</div>
					    	</template>
						<div>
							<el-table
						    	:data="user.collect"
						    	border
						    	style="width: 100%">
						    <el-table-column
						      	fixed
						      	sortable
						      	prop="update_time"
						     	label="日期"
						      	width="300">
						    </el-table-column>
						    <el-table-column
						      	prop="movie_title"
						      	label="姓名"
						      	width="300">
						    </el-table-column>
						    <el-table-column
						      fixed="right"
						      label="操作"
						      width="200">
						      <template slot-scope="scope">
						        <el-button type="success" size="small" plain @click="toDetail(scope.row)">查看</el-button>
						        <el-button type="danger" size="small" plain @click="toDelete(scope.row)">删除</el-button>
						      </template>
						    </el-table-column>
						  </el-table>
						</div>
					 	</el-collapse-item>
					 	<el-collapse-item>
					  		<template slot="title">
					      		<div style="font-size: 24px;color: #409EFF;margin: 10px 0">浏览历史</div>
					    	</template>
					    	<div>暂无内容</div>
					    </el-collapse-item>
					</el-collapse>
			    </el-tab-pane>
			    <el-tab-pane label="其他">
			    	<el-breadcrumb separator=">">
					  	<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					  	<el-breadcrumb-item>个人中心</el-breadcrumb-item>
					  	<el-breadcrumb-item>其他</el-breadcrumb-item>
					</el-breadcrumb>
			    </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<style type="text/css" scoped="prototype">
	.el-tabs--left .el-tabs__header.is-left{
		margin: 0;
	}
	.el-tab-pane{
		padding: 20px;
		background: #fff;
		height: 1500px;
		margin-right: 20px;
	}
	.el-tabs__item.is-active{
		background: #fff;
	}
	.el-tabs--left .el-tabs__item .is-left{
		text-align: left;
	}
	.el-collapse-item__header{
		color: #409EFF;
		font-size: 26px
	}
	.user-info{
		margin: 30px 20px;
		overflow: hidden;
	}
	.user-info .user-img{
		width: 120px;
		height: 160px;
		float: left;
		position: relative;
	}
	.user-info .user-img img{
		width: 100%;
	}
	.user-info .user-headimg{
		width: 100%;
		height: 120px;
		border-radius: 50%;
		border: 1px solid #666;
		overflow: hidden;
	}
	.user-info .user-detail{
		padding: 0 30px;
		float: left;
		text-align: left;
	}
	.user-detail .user-detail-name{
		font-size: 32px;
		font-weight: bolder;
	}
	.edit_headimg{
		position: absolute;
	    left: 50%;
	    transform: translateX(-50%);
	    width: 70%;
	    height: 28px;
	    background: #409EFF;
	    color: #fff;
	    box-sizing: border-box;
	    padding: 5px;
	    text-align: center;
	    bottom: 0;
	}
	.file_headimg{
		position: absolute;
		opacity: 0;
	    left: 50%;
	    transform: translateX(-50%);
	    width: 70%;
	    height: 28px;
	    bottom: 0;
	    font-size:0;
	    cursor: pointer;
	}
	.user-detail-every{
		margin:10px 0;
	}
</style>
<script type="text/javascript">
	import UserEdit from "../../components/useredit";
	export default{
		name:'my',
		components:{
			UserEdit
		},
		data(){
			return{
				user:{
					account:null,
					head_img:null,
					id:null,
					phone:null,
					qq:null,
					role_name:null,
					status:null,
					collect:[]
				},
				edit:{
					role_name:false,
					qq:false,
					phone:false
				},
				updateCollect:false
			}
		},
		created(){
			this.getUserDetail();
			this.user.collect=JSON.parse(sessionStorage.getItem('collect_movie'));
		},
		mounted(){	
		},
		methods:{
			getUserDetail(){
				let that=this;
				let id=this.getCookieText("id");
				let url=this.xyz_api+'/movie/public/Operate/userInfomation.php';
				this.axios.post(url,
					{	
						id:id,
					},{emulateJSON:true})
				.then(res=>{
					console.log(res.data);
					this.user=res.data.data;
					let head_img=this.user.head_img;
					this.user.head_img=head_img.replace(/www.weblyff.xyz/g, "localhost");
					console.log(this.user);
					//this.setCookie("collect_movie",this.user.collect,10080);
					sessionStorage.setItem('collect_movie',JSON.stringify(this.user.collect));
					//console.log(this.getCookieText("collect_movie"));
					//console.log(JSON.parse(sessionStorage.getItem('collect_movie')));
				})
			},
			editHeadimg(event){
				this.file = event.target.files[0];
			  	console.log(this.file);
			  	var URL = window.URL || window.webkitURL;
		        // 通过 file 生成目标 url
		        var imgURL = URL.createObjectURL(this.file);
		        this.user.head_img=imgURL;
		        //创建 formData 对象
			  	let formData = new FormData();
			  	// 向 formData 对象中添加文件
			  	formData.append('file',this.file);
			  	formData.append('id',this.user.id);
			  	let url=this.xyz_api+'/movie/public/Operate/editUserHeadimg.php';
			  	this.axios.post(url,formData,{headers:{"Content-Type": "multipart/form-data"}}).then(res => {
			  		console.log(res)
			    },err => {
			      	console.log(err);
			    });
			},
			editReturn(res){
				this.edit[res.key]=res.edit;
				this.user[res.key]=res.data;
				console.log(this.edit)
			},
			editCancel(res){
				this.edit[res.key]=res.edit;
				console.log(this.edit);
			},
			toDetail(res){
				console.log(res);
				this.$router.push({
					path:'detail',
					query:{
						title:res.movie_title,
						id:res.movie_id
					}
				})
			},
			toDelete(res){
				let that=this;
				let id=this.getCookieText("id");
				let collect_id=res.collect_id;
				console.log(collect_id)
				let url=this.xyz_api+'/movie/public/Operate/userDelCollect.php';
				console.log(res);
				this.$confirm('确认删除《'+res.movie_title+'》的收藏记录？','提示',{
					confrimButtonText:'确定',
					cancelButtonText:'取消',
				}).then(()=>{
					this.axios.post(url,{collect_id:collect_id,id:id},{emulateJSON:true}).then(res=>{
						console.log(res.data);
						sessionStorage.setItem('collect_movie',JSON.stringify(res.data.data));
						this.user.collect=JSON.parse(sessionStorage.getItem('collect_movie'))
						this.$message({
							message:"删除成功！",
							type:"error"
						});
					})
					
				}).catch(()=>{
					this.$message({
						type:'info',
						message:'已取消删除！',
					})
				})
				
			}
		}
	}
</script>