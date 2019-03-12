<template>
	<div style="margin-bottom: 7px;">
		<span class="color1">{{id}}：</span>
		<span class="color2" >
			{{list}}
		</span>
	</div>
</template>
<style type="text/css">
	.color1{
		color: #000;
	}
	.color2{
		color: #666;
	}
</style>
<script type="text/javascript">
	export default{
		name:'infotext',
		props:{
			list:{
				default:''
			},
			id:{
				type:String,
				default:''
			}
		},
		data(){
			return{

			}
		}
	}
</script>