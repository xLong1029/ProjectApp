<template>
	<a id="backTop" :class="['back_top', hasTabBar ? 'has_tab_bar' : '']" @click="goBackTop">返回顶部</a>
</template>

<script>
    import { DelCookie } from 'common/important.js'

	export default {
        name: "backTop",
        props: {
			// 是否底部标签栏或者操作栏
			hasTabBar:{
                type: Boolean,
                // 默认值只能设置为true
				default: true
            }
		},
		data() {
			return {}
        },
		methods:{
            // 返回顶部
            goBackTop(){
                $('body,html').animate({ scrollTop: 0 }, 200);
                // 清除列表数量和滚动高度缓存
                DelCookie('listNum');
                DelCookie('scrollH');
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
        z-index: 30;
         bottom: 10*@rem;
        right: @edge_w;
        cursor: pointer;

        .ft(12);
        .border_radius_4;
    }

    .back_top.has_tab_bar{       
        bottom: 50*@rem;
    }

    @media screen and (min-width: 960px) {
        .back_top{
            right: 50%;
            margin-right: -310px;
        }
    }
</style>
