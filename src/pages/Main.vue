<template>
	<div id="app">
		<!-- 侧边栏组件 -->
		<SideBar></SideBar>
		<!-- 导航栏 -->
		<NavBar :second-pages="secondPages"></NavBar>
		<!-- 页面内容 -->
		<div class="content">
			<transition name="animate">
				<router-view></router-view>
			</transition>
		</div>
		<!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
	// 引入组件
	import NavBar from "components/Common/NavBar.vue";
	import TabBar from "components/Common/TabBar.vue";
	import SideBar from "components/Common/SideBar.vue";
	import Copyright from "components/Common/Copyright.vue";

	export default {
		name: "app",
		components: { NavBar, TabBar, SideBar, Copyright },
		data(){
			return{
				// 定义二级页面名称，作为动态props值
       			secondPages:[ 'NewsDetail', 'NewsSource', 'ChangePassword', 'BookmarkList', 'Message', 'About' ],
			}
		}
	};
</script>
