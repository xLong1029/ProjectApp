<template>
	<div id="register">
		注册
	</div>
</template>

<script>
	// 组件
	import Copyright from "components/Common/Copyright.vue";
	// Api方法
	import Api from "api/register.js";

	export default {
		name: "register",
		components: { Copyright },
		data(){
			return{
			}
		},
		created(){
		},
		methods:{
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";
</style>
