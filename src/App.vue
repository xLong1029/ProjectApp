<template>
	<div id="app">
		<div class="wrapper" ref="wrapper">
			<transition name="animate">
				<router-view></router-view>
			</transition>
		</div>
		<!-- 提示窗口 -->
		<WarnModal></WarnModal>
	</div>
</template>

<script>
	// 引入组件
	import WarnModal from "components/Modal/WarnModal.vue";

	export default {
		name: "app",
		components: { WarnModal },
		data(){
			return{}
		}
	};
</script>

<style lang="less">
	// 引入通用配置文件
	@import "./assets/less/setting";
	// 引入公用样式文件
	@import "./assets/less/common";
</style>
