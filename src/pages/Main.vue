<template>
	<div id="app">
		<!-- 侧边栏组件 -->
		<SideBar></SideBar>
		<!-- 页面切换 -->
		<transition name="animate">
			<router-view></router-view>
		</transition>
		<!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
	// 引入组件
	import SideBar from "components/Common/SideBar.vue";
	import Copyright from "components/Common/Copyright.vue";

	export default {
		name: "app",
		components: { SideBar, Copyright },
		data(){
			return{}
		}
	};
</script>
