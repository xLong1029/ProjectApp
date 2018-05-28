<template>
	<div id="copyright" class="copyright edge_frame">
        <p>© 2018 筑加网 版权所有<br/>桂ICP备16008233号-1</p>
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
		position: absolute;
		width: 100%;
		bottom: 0;

		.ft(12);
		.pb(10);

		p {
			color: @ft_gray_color;
			text-align: center;
			.mb(0);
		}
	}
</style>
