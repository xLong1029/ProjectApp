<template>
	<header class="navbar">	
        <!-- 左边操作-->
        <a class="btn fl">
            <slot name="left"></slot>
        </a>
        <!-- 中间 -->
        <div class="title fl">
            <slot name="center"></slot>
        </div>
        <!-- 右边操作 -->
        <a class="btn fr">
            <slot name="right"></slot>
        </a>				
    </header>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods:{}
	};
</script>

<style lang="less" scoped>
	//引入通用设置文件
	@import "../../assets/less/setting";
	@import "../../assets/less/navbar";
</style>
