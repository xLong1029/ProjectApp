<template>  
    <div id="popModal">
        <div class="pop_modal warning_modal edge_frame" v-show="show" ref="popModal">
            <slot name="header"></slot>
            <div class="modal_cont">
                <slot name="content"></slot>
            </div>
            <slot name="footer"></slot>
        </div>
        <!-- 遮罩层 -->
        <div :class="['mask', show ? 'mask_show' : '']" @click="hideModal"></div>
    </div>
</template>

<script>
    
	export default {
        name: "popModal",
        /* 
        * 获取父级传值
        * 是否显示弹窗 show
        */
        props: {
            show:{
                type: Boolean,
                default: false,
            }
		},
		data() {
			return {}
        },
        updated(){
            this.$nextTick(function () {
                let model = $(this.$refs.popModal);
                model.css('margin-top', - model.height()/2 + 'px');
            })
        },
		methods:{
            // 关闭弹窗
            hideModal(){
                this.$emit('close', false);
            }
		}
	};
</script>

<style lang="less" scoped>
    // 引入通用设置文件
    @import "../../assets/less/setting";

    .warning_modal{
        .modal_cont{
            text-align: center;
            padding: 35*@rem 0;
        }

        .button{
            .wd(180);
            margin: 0 auto;
            .mb(20);
        }
    }

    .modal_icon{
        display: inline-block;
        .ft(24);
        .mb(10);
    }

    .status {
        &_success {
            color: #19be6b;
        }
        &_warning {
            color: #ff9900;
        }
        &_fail {
            color: #ed3f14;
        }
        &_disable {
            color: #ccc;
        }
    }
</style>
