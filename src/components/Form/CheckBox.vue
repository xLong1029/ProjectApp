<template>
	<label for="checkbox" class="form_checkbox_item">
        <span class="form_checkbox_icon"></span>
        <input type="checkbox" id="checkbox" class="form_checkbox" name="agree" v-model="value" @change="setChecked"/>
        {{ text }}
    </label>
</template>

<script>
	export default {
		name: "login",
		/* 获取父级传值
        * 显示文本text
        * 选取值vModel
        */
        props: {
            // 设置默认值
            text:{
                type: String,
                default: ''
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
			setChecked(){
                if(this.value){
                    $('.form_checkbox_icon').addClass('checkbox_checked');
                }
                else{
                    $('.form_checkbox_icon').removeClass('checkbox_checked');
                }
				// 将值传给父组件
                this.$emit('setCheckBoxValue', this.value);
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