<template>
	<header id="navBar">
		<div class="navbar">
			<!-- 判断：如果是二级页面，则添加fr样式，反之添加fl样式 -->
			<a :class="['btn slide_right', secondPages.indexOf($route.name) !== -1 ? 'fr' : 'fl']" @click="pushRight">
				<i class="icon-list"></i>
			</a>			
			<!-- 是否为二级页面，显示返回图标 -->
			<a v-if="secondPages.indexOf($route.name) !== -1" class="btn slide_right fl" @click="$router.go(-1)">
				<i class='icon-back'></i>
			</a>
			<!-- 非二级页面，显示搜索图标 -->
			<a v-else class="btn fr" href="/Search">
				<i class="icon-search"></i>
			</a>
			<!-- 二级页面标题 -->
			<div class="title fl">
				<span v-if="secondPages.indexOf($route.name) !== -1">{{ navTitle }}</span>
				<a v-else class="logo" href="/Index"></a>
			</div>
		</div>
	</header>
</template>

<script>
	// Vuex
	import { mapGetters } from 'vuex'

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
            ...mapGetters([ 'showTabBar', 'navTitle' ]),
        },
		data() {
			return {
				// 是否为二级页面
				isSecondPage: false,
			};
		},
		methods:{
			pushRight(){
				this.$store.commit('SET_SHOW_SIDE_BAR', true);
			}
		}
	};
</script>

<style lang="less">
	//引入通用设置文件
	@import "../../assets/less/setting";

	/* navbar */

	.navbar {
		width: 100%;
		position: fixed;
		z-index: 66;
		height: @navbar_h;
		background: #fff;
		border-bottom: 1px solid #d5d5d5;
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
			color: @base_color;
			font-weight: bold;
		}

		i {
			display: inline-block;
			color: @base_color;
			font-size: 20*@rem;
			margin-top: 8*@rem;
		}
	}

	.logo {
		display: inline-block;
		background: url("../../assets/images/logo.png") no-repeat;
		background-size: 100%;
		width: 166*@half_rem;
		height: 44*@half_rem;
		margin-top: 20*@half_rem;
	}

	/* layout */

	@media screen and (min-width: 960px) {
		.navbar {
			width: @wrapper_max_w;
		}
	}
</style>
