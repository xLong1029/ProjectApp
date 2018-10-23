<template>
	<div id="about">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			关于我们
		</div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	// 通用js
	import Common from 'common/common.js';
	// Api方法
	import Api from "api/user_center.js";

	export default {
		name: "about",
		components: { Loading },
		data(){
			return{
				// 是否加载
				pageLoading: false
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
                this.$store.commit('SET_NAV_TITLE', '关于我们');
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";
</style>
