<template>
	<a id="backTop" class="back_top" @click="goBackTop">返回顶部</a>
</template>

<script>
    import $ from "jquery";

	export default {
		name: "backTop",
		data() {
			return {}
		},
		methods:{
            // 返回顶部
            goBackTop(){
                $('body,html').animate({ scrollTop: 0 }, 200);
            }
		}
	};
</script>

<style lang="less" scoped>
    // 引入通用设置文件
    @import "../../assets/less/setting";

    .back_top{
        position: fixed;
        background: lighten(@base_color, 10%);
        padding: 8*@rem;
        color: #fff;
        z-index: 99;
        bottom: 50*@rem;
        right: @edge_w;

        .ft(12);
        .border_radius_4;
    }
</style>
