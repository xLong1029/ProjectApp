<template>  
    <div id="scrollModal" v-show="show" class="scroll_modal" ref="scrollModal">
        <!-- 标题栏 -->
		<Header>
            <slot slot="left" name="h_left"></slot>
            <slot slot="center" name="h_center"></slot>
            <slot slot="right" name="h_right"></slot>
		</Header>
        <!-- 内容 -->
        <slot name="content"></slot>
        <slot name="bottom"></slot>
    </div>
</template>

<script>
    // 组件
    import Header from "components/Common/Header.vue";
    
    require ('common/scroll_unique.js');
    
	export default {
        name: "scrollModal",
        /* 
        * 获取父级传值
        * 是否显示弹窗 show
        * 数据 listData
        */
        props: {
            show:{
                type: Boolean,
                default: false,
            }
        },
        components: { Header },
		data() {
			return {}
        },
        updated(){
            this.$nextTick(function () {
                $(this.$refs.scrollModal).scrollUnique();
            })
        }
	};
</script>

<style lang="less" scoped>
    // 引入通用设置文件
    @import "../../assets/less/setting";
    @import "../../assets/less/navbar";
    
    .navbar{
        border-bottom: 1px solid lighten(@base_color, 10%);
    }

    .scroll_modal{
        position: fixed;
        z-index: 80;
        top: 0;
        width: 100%;
        height: 100vh;
        background: #fff;
        overflow-y: auto;
    }

    .scroll_modal_box{
        margin-top: @tabbar_h;
    }
    
    /* layout */
	@media screen and (min-width: 960px) {
		.scroll_modal{
			width: @wrapper_max_w;
		}
	}
</style>
