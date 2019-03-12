<template>
	<div class="logpop">
		<div class="logpop-left">
			<div class="logpop-close" @click="logpopClose">X</div>
			<el-tabs v-model="activeName">
			    <el-tab-pane label="登 录" name="login" @keyup.enter.native="UserLogin">
			    	<div style="color: #666;margin-bottom: 15px;">账号登录</div>
			    	<input placeholder="账号" type="text" v-model="userinfo.account"></input><br> 
			    	<input placeholder="密码" type="password" v-model="userinfo.password"></input><br>
			    	<div class="VerifyCode">
			    		<input style="width: 50%" placeholder="请输入验证码" type="text" v-model="userinfo.verifycode"><img v-bind:src="codeimg" @click="NewCode"></input>
			    	</div>
			    	<button @click="UserLogin" >登录</button>
			    </el-tab-pane>
			    <el-tab-pane label="注 册" name="register">
			    	<div style="color: #666;margin-bottom: 15px;">用户注册</div>
			    	<input placeholder="请输入用户名" type="text" ref='name'></input><br> 
			    	<input placeholder="请输入邮箱账号" type="text" ref='account'></input><br> 
			    	<input placeholder="请输入密码" type="password" ref='password'></input><br>
			    	<input placeholder="请确认密码" type="password" ref='repassword'></input><br>
			    	<input style="width: 55%" placeholder="请输入邮箱验证码" type="text" ref='mailcode'><span class="getCodeBtn" @click="getMailCode">获取邮箱验证码</span></input><br>
			    	<!-- <div class="VerifyCode">
			    		<input style="width: 50%" placeholder="请输入验证码" type="text"><img width="40%" src="http://www.weblyff.xyz/movie/public/Login/getVerify.png"></input>
			    	</div> -->
			    	<button @click="UserRegister">注册</button>
			    </el-tab-pane>
			 </el-tabs>
		</div>
	</div>
</template>
<style type="text/css">
	.logpop{
		position: fixed;
		left: 50%;
		top: 20%;
		transform: translate(-50%,0%);
		z-index: 10000;
		background: #fff;
		color: #000;
		width: 450px;
		padding: 20px 30px;
		border-radius: 20px;
	}
	.logpop-left{
		width: 70%;
	}
	.logpop-left .logpop-close{
		width: 20px;
		height: 20px;
		text-align: center;
		position: absolute;
		right: 20px;
		top: 10px;
		color: #fff;
		background: #666;
		border-radius: 50%;
		cursor: pointer;
	}
	.logpop .el-tabs__item{
		font-size: 24px;
	}
	.logpop input{
		box-sizing: border-box;
		margin-bottom: 15px;
		padding: 5px;
		width: 100%;
	}
	.logpop button{
		background: #409EFF;
		color: #fff;
		width: 100%;
		cursor: pointer;
		border: none;
		font-size: 24px;
		padding: 5px 0;
	}
	.getCodeBtn{
		background: #409EFF;
		height: 33px;
		display: inline-block;
		width: 45%;
		line-height: 33px;
    	color: #fff;
    	text-align: center;
	}
	.VerifyCode img{
		float: left;
		padding-left: 20px;
		overflow: hidden;
		height: 40px;
	}
	.VerifyCode input{
		float: left;
	}
</style>
<script type="text/javascript">
	import Bus from '../assets/js/bus.js';
	export default{
		data(){
			return{
				activeName:'login',
				userinfo:{
					account:'',
					password:'',
					verifycode:''
				},
				codeimg:'',
			}
		},
		created(){
			this.NewCode();
		},
		methods:{
			//关闭弹窗
			logpopClose(){
				this.$emit('logpopClose',false);
			},
			//获取新的验证码
			NewCode(){
				this.codeimg='http://images.weblyff.cn/loading.gif';
				let that=this;
				setTimeout(function(){
					that.codeimg=that.xyz_api+'/movie/public/Login/getVerify.png';
					//console.log(that.codeimg);
				},1000)
				
			},
			//获取邮箱验证码
			getMailCode(){
				let that=this;
				let url=this.xyz_api+'/movie/public/Mail/dosend.php';
				this.axios.post(url,
					{	
						mail:this.$refs.account.value,
						name:this.$refs.name.value
					},{emulateJSON:true})
				.then(res=>{
					console.log(res.data);
				})
			},
			//用户登录
			UserLogin(){
				console.log(this.userinfo.account);
				let userinfo=this.userinfo;
				let url=this.xyz_api+"/movie/public/Login/doLogin.php";
				let that=this;
				this.axios.post(url,
					{	
						account:userinfo.account,
						password:userinfo.password,
						code:userinfo.verifycode
					},{emulateJSON:true})
				.then(res=>{
					this.NewCode();
					console.log(res.data);
					if(res.data.msg=="登录成功"){
						var head_img=res.data.data.head_img;
						head_img=head_img.replace(/www.weblyff.xyz/g, "localhost");
						Bus.$emit('login',true);
						Bus.$emit('head_img',head_img);
						Bus.$emit('id',res.data.data.id);
						Bus.$emit('role_name',res.data.data.role_name);
						this.logpopClose();
						/*this.$notify({
				          title: '登录成功',
				          message: '欢迎'+res.data.data.role_name+'登录落叶电影网!',
				          type: 'success',
				          duration: 3000,
				        });*/
				        this.$message({
				          message: '欢迎'+res.data.data.role_name+'登录落叶电影网!',
				          type: 'success'
				        });
						//console.log(this.getCookieText("login"));
					}else{
						console.log("loginfalse");
						this.$message({
        					message:res.data.msg+"！",
        					type:"error",
        				})
					}
					
				})
			},
			//用户注册
			UserRegister(){
				let that=this;
				let url=that.xyz_api+'/movie/public/Register/doRegister.php';
				this.axios.post(url,
					{	
						role_name:this.$refs.name.value,
						account:this.$refs.account.value,
						password:this.$refs.password.value,
						code:this.$refs.mailcode.value
					},{emulateJSON:true})
				.then(res=>{
					console.log(res.data);
				})
			}

		}
	}
</script>