<template>
	<div id="copyright" class="copyright edge_frame">
        <p>Copyright © 2018-2019<br/>SOLO之队版权所有 桂ICP备12345678号-1</p>
    </div>
</template>

<script>

	export default {
		name: "copyright",
		data() {
			return {}
		},
		methods:{
		}
	};
</script>

<style lang="less" scoped>
    // 引入通用设置文件
    @import "../../assets/less/setting";
    
    .copyright {
		// border-top: @border_deep;
		.ft(12);
		.mt(15);
		.pb(10);

		p {
			color: @ft_gray_color;
			text-align: center;
			.mb(0);
		}
	}
</style>
