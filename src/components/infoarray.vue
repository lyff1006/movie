<template>
	<div style="margin-bottom: 7px;">
		<span class="color1">{{id}}：</span>
		<span v-for="(item,i) in list" class="color2" >
			{{item}}<span v-if="i!=list.length-1">/</span>
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
				type:Array,
				default:function(){
					return [];
				}
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