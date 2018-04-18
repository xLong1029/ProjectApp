<template>
	<div id="login">
		登录
	</div>
</template>

<script>
	// 组件
	import Copyright from "components/Common/Copyright.vue";
	// Api方法
	import Api from "api/login.js";

	export default {
		name: "login",
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