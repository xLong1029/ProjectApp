<template>
	<div id="app">
		<div class="wrapper" ref="wrapper">
			<transition name="animate">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>

	export default {
		name: "app",
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
