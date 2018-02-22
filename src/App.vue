<template>
	<div id="app">
		<div class="wrapper" ref="wrapper">
			<!-- 侧边栏组件 -->
			<SideBar></SideBar>
			<!-- 导航栏 -->
			<NavBar :second-pages="secondPages"></NavBar>
			<!-- 移动主体 -->
			<div :class="['push_body', showSideBar ? 'push_body_toright' : '']">
				<!-- 页面内容 -->
				<div class="content">
					<transition name="animate">
						<router-view></router-view>
					</transition>
				</div>
			</div>
			<!-- 标签栏 -->
			<TabBar v-if="secondPages.indexOf($route.name) === -1"></TabBar>
		</div>
	</div>
</template>

<script>
	// 引入组件
	import NavBar from "components/Common/NavBar.vue";
	import TabBar from "components/Common/TabBar.vue";
	import SideBar from "components/Common/SideBar.vue";
	// Vuex
	import { mapGetters } from 'vuex'

	export default {
		name: "app",
		computed: {
            ...mapGetters([ 'showTabBar', 'showSideBar' ]),
        },
		components: { NavBar, TabBar, SideBar },
		data(){
			return{
				// 定义二级页面名称，作为动态props值
       			secondPages:['CompanyIntro', 'ContactUs', 'Search', 'NewsDetail', 'CaseDetail' ],
			}
		}
	};
</script>

<style lang="less">
	// 引入通用配置文件
	@import "./assets/less/setting";
	// 引入公用样式文件
	@import "./assets/less/common";
</style>
