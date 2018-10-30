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
				<li class="info_list_item cont_frame" @click="gotoCompanyInfo" style="cursor: pointer;">
					公司简介<i class="icon_next"></i>
				</li>
				<li class="info_list_item cont_frame">
					当前版本
					<span class="fr"><i class="tips">内测版</i>V1.2</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// 组件
	import NavBar from "components/Common/NavBar.vue";
	// 通用js
	import Common from 'common/common.js';
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
			// 跳转公司简介
			gotoCompanyInfo(){
				Common.GotoPage('CompanyIntro', {}, this);
			}
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

		.icon_next{
			color: #ddd;
			float: right;

			.mt(5);
			.ft(12);
		}
	}
</style>
