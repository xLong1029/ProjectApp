<template>
	<div id="about">
		<!-- 导航栏 -->
		<NavBar title="关于我们" :is-second-page="true"></NavBar>
		<!-- 页面内容 -->
		<div class="content">
			<div class="info">
				<img class="icon" :src="logo"/>
				<p>华建项目申报资讯平台</p>
			</div>
			<ul class="info_list">
				<li class="info_list_item cont_frame">
					当前版本
					<span class="fr"><i class="tips">最新版</i>V1.2</span>
				</li>
			</ul>
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
				logo: require('@/assets/images/icon_256x256.png'),
			}
		},
		methods:{
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	.info{
		text-align: center;
		padding: 30*@rem 0;

		.icon{
			.wd(80);
			.mb(15);
		}
	}

	.info_list_item{
		.tips{
			background: @warn_color;
			color: #fff;
			font-style: normal;
			padding: 2*@rem 5*@rem;

			.ft(12);
			.border_radius(4);
			.mr(10);
		}
	}
</style>
