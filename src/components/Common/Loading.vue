<template>
	<div id="loading" class="loading">
        <i class="icon-loading"></i>
        <p>玩命加载中</p>
    </div>
</template>

<script>
	export default {
		name: "loading",
		data() {
			return {}
		},
		methods:{
		}
	};
</script>

<style lang="less" scoped>
    // 引入通用设置文件
    @import "../../assets/less/setting";
    
    .loading{        
        top: 50%;
        margin-top: -21px;
        width: 100%;
        text-align: center;
        position: fixed;
        color: #666;

        .icon-loading{
            display: inline-block;
            animation: rotating 2s linear infinite;
            -webkit-animation: rotating 2s linear infinite;
            -moz-animation: rotating 2s linear infinite;
            -o-animation: rotating 2s linear infinite;
        }

        .loading_text{
            color: @base_color;

            margin: 3px 0;

            .ft(14);
        }
    }

    @keyframes rotating {
        0% {
             transform: rotate(0deg);
        }
        100% {
            transform: rotate(1turn);
        }   
    }

    @media screen and (min-width: 960px) {
        .loading {
            width: @wrapper_max_w;
        }
    }
</style>
