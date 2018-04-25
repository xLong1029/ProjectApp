<template>  
    <div id="warnModal">
        <div class="pop_modal warning_modal edge_frame" v-show="warnModal.show" ref="popModal">
            <div class="modal_cont">
                <div>
                    <i v-if="warnModal.showIcon && warnModal.type == 'warning'" class="modal_icon icon_warning status_warning"></i>
                    <i v-if="warnModal.showIcon && warnModal.type == 'success'" class="modal_icon icon_success status_success"></i>
                    <i v-if="warnModal.showIcon && warnModal.type == 'fail'" class="modal_icon icon_fail status_fail"></i>
                    <i v-if="warnModal.showIcon && warnModal.type == 'disable'" class="modal_icon icon_disable status_disable"></i>
                </div>
                {{ warnModal.text }}
            </div>
            <button class="button" @click="hideModal">确定</button>
        </div>
        <!-- 遮罩层 -->
        <div :class="['mask', warnModal.show ? 'mask_show' : '']" @click="hideModal"></div>
    </div>
</template>

<script>
    // Vuex
    import { mapGetters } from 'vuex'
    
	export default {
        name: "warnModal",
        computed: {
            ...mapGetters([ 'warnModal' ]),
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
                this.$store.commit('SET_WARN_MODAL', { show: false, text: '' });
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
            padding: 20*@rem 0 35*@rem 0;
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
