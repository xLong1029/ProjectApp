<template>
	<div id="collection">
		收藏夹
		<!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
	// 组件
	import Copyright from "components/Common/Copyright.vue";
	// Api方法
	import Api from "api/user_center.js";

	export default {
		name: "collection",
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
