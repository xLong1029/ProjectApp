<template>
	<div id="sectionTitle" class="section_title">
        <span class="decorate fl" :style="{ backgroud: color }"></span>
        <h2 class="name fl">{{ title }}</h2>
        <router-link v-if="readMore && routeName" :to="{ name: routeName, query: routeQuery }" class="more fr">更多<i class="icon-next fr"></i></router-link>
    </div>
</template>

<script>
	// 通用js
	import Common from 'common/common.js'

	export default {
        name: "sectionTitle",
        /* 
        * 获取父级传值
        * 标题 title
        * 左边装饰颜色 color
        * 右边“更多”按钮 readMore
        * “更多按钮”跳转路由 routeName
        * 跳转页面携带参数 routeQuery
        */
    	props: {
			title: {
				type: String,
				default: '模块标题'
            },
            color: {
                type: String,
                default: '#3B89C0'
            },
            readMore: {
                type: Boolean,
                default: false
            },
            routeName: {
                type: String,
                default: null
            },
            routeQuery: {
                type: Object,
                default: () => {
                    return {}
                }
            }
		},
		data() {
			return {
			};
		},
		methods:{
		}
	};
</script>

<style lang="less" scoped>
    // 引入通用设置文件
    @import "../../assets/less/setting";
    
    .section_title{
        background: #fff;
        width: 100%;
        line-height: 30*@rem;
        border-bottom: @border_deep; 

        .ht(30);

        .decorate{
            display: block;
            height: 100%;
            width: 3*@rem;
            background: @base_color;
        }

        .name{
            font-weight: normal;
            color: @base_color;

            .ml(5);
            .ft(14);
        }

        .more{
            color:@ft_gray_color;
            
            .ft(12);
            .mt(1);
            .mr(5);

            .icon-next{
                .mt(8);
                color: #ccc;
            }
        }
    }
</style>
