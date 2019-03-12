<template>
	<div class="bg" v-show="show"></div>
</template>
<style type="text/css">
	.bg{
		position: fixed;background: rgb(0, 0, 0);opacity: 0.6;width: 100%;height: 100%;z-index: 9999;
	}
</style>
<script type="text/javascript">
	export default{
		props:{
			show:{
				default:true,
			}
		}
	}
</script>