<template>
	<div id="unLogined">
		<div class="un_logined">
			<p>你还未登录</p>
			<router-link class="button login_btn" :to="{ name: 'Login' }">去登录</router-link>
			
		</div>
		<!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
	// 组件
	import Copyright from "components/Common/Copyright.vue";
	export default {
		name: "unLogined",
		components: { Copyright },
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