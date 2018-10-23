<template>
	<div id="about">
		<!-- 导航栏 -->
		<NavBar :show-title="false" :show-msg="true"></NavBar>
		<!-- 页面内容 -->
		<div class="content">
			关于我们
		</div>
	</div>
</template>

<script>
	// 组件
	import NavBar from "components/Common/NavBar.vue";
	// Api方法
	import Api from "api/user_center.js";

	export default {
		name: "about",
		components: { NavBar },
		data(){
			return{
			}
		},
		methods:{
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";
</style>
