<template>  
    <div id="warnModal">
        <div class="pop_modal warning_modal edge_frame" v-show="warnModal.show" ref="popModal">
            <p>{{ warnModal.text }}</p>
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
        p{
            text-align: center;
            padding: 20*@rem 0;
        }

        .button{
            .wd(200);
            margin: 0 auto;
            .mb(20);
        }
    }
</style>
