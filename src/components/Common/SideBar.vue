<template>
	<aside id="sideBar">
		<div ref="sideList" :class="['sidebar_left sidebar', showSideBar ? 'sidebar_open' : '']">
			<ul class="sidebar_list">
				<li v-for="(item, index) in sideNav" :key="index" :class="['sidebar_item', item.routeName === $route.name ? 'on' : '']" @click="hideSideBar(item.routeName)">
					<span>
						{{ item.title }}
						<i class="icon-list-next"></i>
					</span>
				</li>
			</ul>
		</div>
		<!-- 遮罩层 -->
		<div :class="['mask', showSideBar ? 'mask_show' : '']" @click="hideSideBar(null)"></div>
	</aside>
</template>

<script>
	// 通用js
    import Common from 'common/common.js'
	//Vuex
	import { mapGetters } from 'vuex'

	export default {
		name: "sideBar",
		computed: {
            ...mapGetters([ 'showSideBar' ]),
        },
		data() {
			return {
				// 侧边栏导航
				sideNav: [
					{
						routeName: 'Index',
						title: "首页"
					},
					{
						routeName: 'CompanyIntro',
						title: "公司简介"
					},
					{
						routeName: 'SuccCases',
						title: "成功案例"
					},					
					{
						routeName: 'ProjectNews',
						title: "申报资讯"
					},
					{
						routeName: 'ContactUs',
						title: "联系我们"
					},
					{
						routeName: 'Search',
						title: "搜索"
					}
				]
			};
		},
		mounted() {
		},
		// 方法
		methods: {
			// 隐藏侧边栏
			hideSideBar(routeName) {
				this.$store.commit('SET_SHOW_SIDE_BAR', false);
				if(routeName){
					Common.GotoPage(routeName, {}, this);
				}
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
		background: @base_color;
		color: #fff;
		position: fixed;
		width: 480*@half_rem;
		height: 100%;
		top: 0;
		z-index: 99;
		-webkit-transition: all 0.3s ease;
		-moz-transition: all 0.3s ease;
		transition: all 0.3s ease;

		.sidebar_item {
			display: block;
			height: 80*@half_rem;
			line-height: 80*@half_rem;
			padding: 0 @edge_w;
			border-bottom: 1px solid lighten(@base_color, 10%);
			cursor: pointer;

			&:hover {
				background: lighten(@base_color, 10%);
			}
		}

		.sidebar_item.on{
			color: @base_color;
			background: #fff;
		}
	}
</style>
