<template>
	<transition name="bounce">
		<div class="totop" @click="toTop" v-show="totopshow">
			<img width="100%" src="http://images.weblyff.cn/totop.png">
		</div>
	</transition>
</template>
<style type="text/css">
	.totop{
		z-index: 999;
		border-radius: 50%;
		position: fixed;
		right: 5%;
		bottom: 5%;
		/*background: #409EFF;
		color: #fff;*/
		padding: 2px;
		cursor: pointer;
		width: 50px;
		height: 50px;
		background: #fff;
	}
	.bounce-enter-active {
	  	animation: bounce-in .5s;
	}
	.bounce-leave-active {
	  	animation: bounce-in .5s reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		    opacity: 0;
		    right: 0;
		}
	  	75% {
	  		transform: scale(0.9);
	  		opacity: 0.8;
	  		right: 8%;
	  	}
	  	100% {
	  		transform: scale(1);
	    	right: 1;
	    	opacity: 1;
	  	}
	}
</style>
<script type="text/javascript">
	export default{
		name:"totop",
		components:{},
		data(){
			return{
				totopshow:false
			}
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			handleScroll(){
				var scrollTop = window.pageYOffset ;//|| document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop<window.screen.height){
					this.totopshow=false;
				}else{
					this.totopshow=true;
				}
			},
			toTop(){
				document.documentElement.scrollTop=document.body.scrollTop=0;
			},
		}
	}
</script>