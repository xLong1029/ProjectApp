<template>
	<header id="navBar">
		<div class="navbar">
			<!-- 判断：如果是二级页面，则添加fr样式，反之添加fl样式 -->
			<a :class="['btn slide_right', secondPages.indexOf($route.name) !== -1 ? 'fr' : 'fl']" @click="pushRight">
				<i class="icon-list"></i>
			</a>			
			<!-- 是否为二级页面，显示返回图标 -->
			<a v-if="secondPages.indexOf($route.name) !== -1" class="btn slide_right fl" @click="goBack">
				<i class="icon-back"></i>
			</a>
			<!-- 非二级页面，显示搜索图标 -->
			<a v-else class="btn fr" @click="toSearch">
				<i class="icon-search"></i>
			</a>
			<!-- 二级页面标题 -->
			<div class="title fl">
				<span v-if="secondPages.indexOf($route.name) !== -1">{{ navTitle }}</span>
				<span v-else class="icon-logo" href="/Index"></span>
			</div>
		</div>
	</header>
</template>

<script>
	// Vuex
	import { mapGetters } from 'vuex'
	// 通用js
	import Common from 'common/common.js'

	export default {
		name: "navBar",
    	props: {
			// 二级页面路由列表
			secondPages:{
				type: Array,
				default: []
			},
		},
		computed: {
            ...mapGetters([ 'showTabBar', 'navTitle', 'goBackRoute' ]),
        },
		data() {
			return {
				// 是否为二级页面
				isSecondPage: false,
			};
		},
		methods:{
			// 向右推出
			pushRight(){
				this.$store.commit('SET_SHOW_SIDE_BAR', true);
			},
			// 跳转“搜索”页面
			toSearch(){
				Common.GotoPage('Search', {}, this);
			},
			// 返回上一页
			goBack(){
				if(this.goBackRoute.name) Common.GotoPage(this.goBackRoute.name, this.goBackRoute.query, this);
				else this.$router.go(-1);
			}
		}
	};
</script>

<style lang="less" scoped>
	//引入通用设置文件
	@import "../../assets/less/setting";

	/* navbar */

	.navbar {
		width: 100%;
		position: fixed;
		z-index: 66;
		height: @navbar_h;
		background: @base_color;
		// border-bottom: 1px solid #d5d5d5;
		top: 0;

		.btn {
			width: 15%;
			height: @navbar_h;
			text-align: center;
			cursor: pointer;
		}
		.title {
			width: 70%;
			height: @navbar_h;
			text-align: center;
			font-size: 16*@rem;
			line-height: @navbar_h;
			color: #fff;
			font-weight: bold;
		}

		i {
			display: inline-block;
			color: #fff;
			font-size: 18*@rem;
			margin-top: 10*@rem;
		}
	}

	.icon-logo {
		font-size: 64*@rem;
		line-height: 35*@rem;
	}

	/* layout */

	@media screen and (min-width: 960px) {
		.navbar {
			width: @wrapper_max_w;
		}
	}
</style>
