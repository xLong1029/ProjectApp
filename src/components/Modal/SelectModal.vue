<template>  
    <div id="selectModal" v-show="show" class="select_modal" ref="selectModal">
        <!-- 标题栏 -->
		<header class="navbar">
            <!-- 取消按钮-->
			<a class="btn fl">
				<button class="button cancel_btn" @click="hideModal">取消</button>
			</a>
			<!-- 标题 -->
			<div class="title fl"><slot name="title"></slot></div>
			<!-- 全选按钮 -->
			<a class="btn fr">
				<input type="button" class="button select_btn" @click="submit" value="完成"/>
			</a>
		</header>
        <!-- 选择列表 -->
        <div class="select_list">
            <span :class="['select_list_item', selectIndex == index ? 'active' : '']" v-for="(item, index) in listData" :key="index" @click="setIndex(index)">{{ item.name }}</span>
        </div>
        <slot name="bottom"></slot>
    </div>
</template>

<script>
    require ('common/scroll_unique.js');
    
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
			return {
                // 选中值索引
                selectIndex: -1,
            }
        },
        updated(){
            this.$nextTick(function () {
                $(this.$refs.selectModal).scrollUnique();
            })
        },
		methods:{
            // 设置选中值索引
			setIndex(index){
                this.selectIndex = index;
            },
            // 关闭弹窗
            hideModal(){
                this.$emit('setShowModal', false);
                this.selectIndex = -1;
            },
            // 确认选值
            submit(){
                this.$emit('getSelectData', this.selectIndex);
				this.$emit('setShowModal', false);
            }
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

    .select_modal{
        position: fixed;
        z-index: 99;
        top: 0;
        width: 100%;
        height: 100vh;
        background: #fff;
        overflow-y: auto;
    }

    .select_modal_box{
        margin-top: @tabbar_h;
    }

    .select_list{
        margin-top: @navbar_h;
        width: 100%;
    }

    .select_list_item{
        display: block;
        height: 46*@rem;
        line-height: 46*@rem;
		padding: 0 12*@rem;
		border-bottom: @border_light;
		text-align: center;
		cursor: pointer;

		&:hover{
			color: @base_color;
			background: @base_hover_color;
        }
        
        &.active{
            color: #fff;
			background: @base_color;
        }
    }
    
    /* layout */
	@media screen and (min-width: 960px) {
		.select_modal, .title_bar {
			width: @wrapper_max_w;
		}
	}
</style>
