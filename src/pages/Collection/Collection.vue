<template>
	<div id="collection">
		<div v-if="isLogined">
			<!-- 加载数据 -->
			<Loading v-if="pageLoading"></Loading>
			<!-- 加载结束 -->
			<div v-else>
				<!-- 分组列表 -->
				<ul>
					<li class="cont_frame collect_group_list">
						<i class="list_icon icon-news"></i>修改密码<i class="icon-next"></i>
					</li>
					<li class="cont_frame collect_group_list">
						<i class="list_icon icon-exit"></i>退出登录<i class="icon-next"></i>
					</li>
				</ul>
				<!-- 操作栏 -->
				<div id="operateBar">
					<ul class="operate_bar">
						<li class="operate_item">
							<i class="operate_icon icon-news"></i>
							<span class="operate_title">添加分组</span>
						</li>
						<li class="operate_item">
							<i class="operate_icon icon-news"></i>
							<span class="operate_title">删除分组</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div v-else class="no_login">
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
	// 通用JS
	import { GetCookie } from 'common/important.js';
	// Api方法
	import Api from "api/user_center.js";

	export default {
		name: "collection",
		components: { Copyright },
		data(){
			return{
				// 是否已登录
				isLogined: false,
				// 是否加载
				pageLoading: false
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
				if(GetCookie('project_token')){
					this.isLogined = true;
				}
                this.$store.commit('SET_NAV_TITLE', '收藏夹');
            },
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	/* no_login */

	.no_login{
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

	/* collect_group_list */
	
	.collect_group_list{
		.list_icon{
			.mr(5);
		}

		.icon-next{
			color: #ddd;
			float: right;

			.mt(5);
			.ft(12);
		}
	}

	/* operate_bar */

	.operate_bar {
		height: @tabbar_h;
		background: #fff;
		bottom: 0;
		border-top: @border_deep;
		font-size: 12*@rem;
		width: 100%;
		position: fixed;
		z-index: 50;

		a, i, span {
			display: block;
		}
	}

	.operate_item {
		float: left;
		text-align: center;
		width: 50%;
		height: 86*@half_rem;
		color: #666;
		cursor: pointer;
		position: relative;

		&:hover{
			color: @base_color;
		}
	}

	.operate_icon {
		margin: 0 auto;
		text-align: center;
		.mt(4);
		.ft(18);
	}

	.operate_title {
		text-align: center;
		margin-top: 1*@rem;
	}

	

	/* layout */
	@media screen and (min-width: 960px) {
		.operate_bar {
			width: @wrapper_max_w;
		}
	}
</style>
