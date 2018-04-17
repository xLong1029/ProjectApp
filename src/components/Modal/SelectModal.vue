<template>  
    <div id="selectModal">
        <div class="pop_modal" v-show="show" ref="popModal">
            <span class="select_list_item" v-for="(item, index) in listData" :key="index" @click="selectService(index)">{{ item.name }}</span>
        </div>
        <!-- 遮罩层 -->
        <div :class="['mask', show ? 'mask_show' : '']" @click="hideModal"></div>
    </div>
</template>

<script>
	export default {
        name: "selectModal",
        props: {
            // 是否显示弹窗
            show:{
                type: Boolean,
                default: false,
            },
			// 数据
			listData:{
				type: Array,
				default: []
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
            // 选择服务类型
			selectService(index){
                this.$emit('getSelectdata', this.listData[index].name);
				this.$emit('setShowModal', false);
            },
            // 关闭弹窗
            hideModal(){
                this.$emit('setShowModal', false);
            }
		}
	};
</script>

<style lang="less" scoped>
    // 引入通用设置文件
    @import "../../assets/less/setting";

    .select_list_item{
		display: block;
		padding: 12*@rem;
		border-bottom: @border_light;
		text-align: center;
		cursor: pointer;

		&:hover{
			color: @base_color;
			background: @base_hover_color;
		}
	}
</style>
