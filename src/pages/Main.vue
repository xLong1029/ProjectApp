<template>
	<div id="app">
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
		<!-- 提示窗口 -->
		<WarnModal></WarnModal>
	</div>
</template>

<script>
	// 引入组件
	import NavBar from "components/Common/NavBar.vue";
	import TabBar from "components/Common/TabBar.vue";
	import SideBar from "components/Common/SideBar.vue";
	import WarnModal from "components/Modal/WarnModal.vue";
	// Vuex
	import { mapGetters } from 'vuex'

	export default {
		name: "app",
		computed: {
            ...mapGetters([ 'showTabBar', 'showSideBar' ]),
        },
		components: { NavBar, TabBar, SideBar, WarnModal },
		data(){
			return{
				// 定义二级页面名称，作为动态props值
       			secondPages:['Search', 'NewsDetail' ],
			}
		}
	};
</script>

<style lang="less">
</style>
