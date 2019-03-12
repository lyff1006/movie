<template>
	<span>
		<input  v-show="edit" type="text" v-bind:value="data" ref="newdata">
		<span class="red-btn" v-show="edit" @click="editReturn">确定</span>
		<span class="green-btn" v-show="edit" @click="editCancel">取消</span>
		<span v-show="!edit">{{data}}<span v-if="data==null">暂无</span> </span>
	</span>
</template>
<script type="text/javascript">
	export default{
		props:{
			edit:{
				default:false
			},
			data:"",
			index:""
		},
		data(){
			return{
				res:{
					key:"",
					edit:"",
					data:""
				}
			}
		},
		methods:{
			editReturn(){
				let that=this;
				let newdata=this.$refs.newdata.value;
				if(newdata!=null&&newdata!=""){
					let id=this.getCookieText("id");
					let url=this.xyz_api+'/movie/public/Operate/editUserDetail.php';
					this.axios.post(url,
						{	
							id:id,
							key:this.index,
							data:newdata
						},{emulateJSON:true})
					.then(res=>{
						console.log(res);
						if(res.data.code==1){
							that.res.key=that.index;
							that.res.edit=false;
							that.res.data=newdata;
							that.$emit('editReturn', that.res)
						}else{
							alert("更新失败")
						}
					})
				}else{
					alert("不能为空")
				}
			},
			editCancel(){
				let that=this;
				that.res.key=that.index;
				that.res.edit=false;
				that.$emit('editCancel', that.res);
			}
		}
	}
</script>