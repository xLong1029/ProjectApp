<template>
	<div id="userCenter">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			个人中心
			<!-- 版权信息 -->
			<Copyright></Copyright>
		</div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import Copyright from "components/Common/Copyright.vue";
	// Api方法
	import Api from "api/user_center.js";

	export default {
		name: "userCenter",
		components: { Loading, Copyright },
		data(){
			return{
				// 是否加载
				pageLoading: false
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
