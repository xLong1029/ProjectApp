<template>
	<label class="form_checkbox_item">
        <span :class="['form_checkbox_icon', value ? 'checkbox_checked' : '']"></span>
        <input type="checkbox" class="form_checkbox" v-model="value" @change="changeChecked"/>
        {{ text }}
    </label>
</template>

<script>
	export default {
		name: "login",
		/* 获取父级传值
        * 显示文本text
        * 选取值vModel
        * 当前索引index
        */
        props: {
            text:{
                type: String,
                default: ''
            },
            index: {
                type: Number,
                default: -1
            },
            vModel:{
                type: Boolean,
                default: false
            }
        },
		data(){
			return{
                value: false,
            }
        },
        created(){
            this.value = this.vModel;
        },
		methods:{
            // 设置值
            setChecked(e){
                this.value = e;
            },
            // 改变值
			changeChecked(){
				// 将值传给父组件
                this.$emit('change', [this.value, this.index]);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
    @import "../../assets/less/setting";
    
    .form_checkbox_item{
        position: relative;
        .mr(8);
    }

    .form_checkbox_icon{
        display: inline-block;
        width: 14*@rem;
        height: 14*@rem;
        position: relative;
        top: 2*@rem;
        left: 0;
        border: 1px solid #fff;
        background: #fff;
        border: @border_deep;
        border-radius: 2*@rem;
    }

    .form_checkbox_icon.checkbox_checked{
        border: 1px solid @base_color;
        background: @base_color;

        &:after{
            content: "";
            display: table;
            width: 4*@rem;
            height: 8*@rem;
            position: absolute;
            top: -1*@rem;
            left: 3*@rem;
            border: 2*@rem solid #fff;
            border-top: 0;
            border-left: 0;
            -webkit-transform: rotate(45deg) scale(1);
            transform: rotate(45deg) scale(1);
            transition: all .2s ease-in-out;
        }
    }

    .form_checkbox{
        visibility: hidden;
        position: absolute;
        left: 0;
        top: 3*@rem;
    }
</style>