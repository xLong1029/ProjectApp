<template>
	<div id="unLogined">
		<!-- 导航栏 -->
		<NavBar :show-title="false" :show-msg="true"></NavBar>
		<!-- 页面内容 -->
		<div class="content">
			<div class="un_logined">
				<p>你还未登录</p>
				<router-link class="button login_btn" :to="{ name: 'Login' }">去登录</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	// 组件
	import NavBar from "components/Common/NavBar.vue";

	export default {
		name: "unLogined",
		components: { NavBar },
		data(){
			return{}
		},
		created(){},
		methods:{}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	/* un_logined */
	
	.un_logined{
		background: #fff;
		padding: 100*@rem 0;

		p{
			text-align: center;
		}
	}

	.login_btn{
		margin: auto;
		.wd(150);

		&:hover{
			color: #fff;
		}
	}
</style>