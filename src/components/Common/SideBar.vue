<template>
	<div id="sideBar">
		<aside ref="sideBar" :class="['sidebar_left sidebar', showSideBar ? 'sidebar_open' : '']">
			<div v-if="isLogined" class="user_info is_logined">
				<p>欢迎回来，{{ userAccount.userName }}</p>
			</div>
			<div v-else class="user_info">
				<p>登录华建项目申报<br/>收藏资讯随时翻阅</p>
				<button class="button login_btn" @click="toLogin">立即登录</button>
			</div>
			<div class="sidebar_list">
				<ul v-for="(navItem, index) in sideNav" :key="index" class="sidebar_nav">
					<li v-for="(item, i) in navItem" :key="i" :class="['sidebar_li_item', item.rName === $route.name ? 'on' : '']" @click="hideSideBar(item.rName, item.rQuery)">
						<span><i :class="item.icon"></i>{{ item.title }}</span>
						<span v-if="item.rName == 'Message' && unReadCount">
							<span class="new_msg">{{ unReadCount }}</span>
						</span>
					</li>
				</ul>
			</div>
			<div v-if="isLogined" class="sidebar_bottom edge_frame">
				<a @click="logOut" style="cursor:pointer;"><i class="icon_exit"></i>退出登录</a>
			</div>
		</aside>
		<!-- 遮罩层 -->
		<div :class="['mask', showSideBar ? 'mask_show' : '']" @click="hideSideBar(null)"></div>
	</div>
</template>

<script>
	// 通用js
	import Common from 'common/common.js';
	import { ClearAccount } from 'common/account.js';
	//Vuex
	import { mapGetters } from 'vuex';

	export default {
		name: "sideBar",
		computed: {
            ...mapGetters([ 'showSideBar', 'userAccount', 'isLogined', 'unReadCount' ]),
        },
		data() {
			return {
				// 侧边栏导航
				sideNav: [
					// 资讯列表
					[
						{
							rName: 'ProjectNews',
							icon: 'icon_news',
							rQuery: {},
							title: "申报资讯"
						}
					],
					// 个人设置
					[
						{
							rName: 'UserCenter',
							icon: 'icon_user',
							rQuery: {},
							title: "个人中心"
						},
						{
							rName: 'CollectList',
							icon: 'icon_collection',
							rQuery: {},
							title: "收藏夹"
						},
						{
							rName: 'Message',
							icon: 'icon_email',
							rQuery: {},
							title: "消息通知",
						}
					],					
					// 搜索
					[
						{
							rName: 'Search',
							icon: 'icon_search',
							rQuery: {},
							title: "搜索"
						}
					],
					// 关于我们
					[
						{
							rName: 'About',
							icon: 'icon_company',
							rQuery: {},
							title: "关于我们"
						}
					]
				]
			};
		},
		// 方法
		methods: {
			// 隐藏侧边栏
			hideSideBar(rName, rQuery) {
				this.$store.commit('SET_SHOW_SIDE_BAR', false);
				if(rName){
					Common.GotoPage(rName, rQuery, this);
				}
			},
			// 跳转登录页面
			toLogin(){
				this.$store.commit('SET_SHOW_SIDE_BAR', true);
				Common.GotoPage('Login', {}, this);
			},
			// 退出登录
			logOut(){
				ClearAccount(this.$store.commit);
				this.hideSideBar();
			}
		}
	};
</script>

<style lang="less" scoped>
	//引入通用设置文件
	@import "../../assets/less/setting";

	/* sidebar */

	.sidebar_left {
		left: -480*@half_rem;
	}

	.sidebar_left.sidebar_open {
		left: 0;
	}

	.sidebar {
		background: @page_bg_color;
		color: @ft_base_color;
		position: fixed;
		width: 480*@half_rem;
		height: 100%;
		top: 0;
		z-index: 99;
		-webkit-transition: all 0.3s ease;
		-moz-transition: all 0.3s ease;
		transition: all 0.3s ease;
	}

	.user_info{
		// background-color: #2b2b2e;
		background: url('../../assets/images/user_info_bg.jpg');
		background-size:cover;
		color: #fff;

		.ht(150);

		.pt(30);

		p{
			text-align:center;
		}

		.login_btn{
			width: 50%;
			margin: auto;

			&:hover{
				color: #fff;
			}
		}
	}

	.user_info.is_logined{
		.ht(80);
	}

	.sidebar_nav{
		.mb(10);
	}


	.sidebar_li_item {
		position: relative;
		display: block;
		height: 80*@half_rem;
		line-height: 80*@half_rem;
		padding: 0 @edge_w;
		cursor: pointer;
		background: #fff;

		&:hover {
			background: lighten(@base_color, 10%);
			color: #fff;

			i{
				color: #fff;
			}
		}

		i{
			.mr(10);
			color: @ic_gray_color;
		}

		.new_msg{
			position: absolute;
			background: @warn_color;
			display: inline-block;
			text-align: center;
			line-height: 19*@rem;
			right: 10*@rem;
			top: 10*@rem;
			color:#fff;
			padding: 0 5*@rem;
			min-width: 20*@rem;

			.ht(20);
			.ft(12);
			.border_radius(10);
		}
	}

	.sidebar_bottom{
		width: 480*@half_rem;
		position:absolute;
		bottom: 0;
		left: 0;

		line-height: 40*@rem;

		.ht(40);

		i{
			.mr(5);
			color: @ic_gray_color;
		}
	}
</style>
