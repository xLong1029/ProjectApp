<template>
	<div id="newsList">
        <ul class="news_list">
            <li v-for="(item, index) in data" v-if="index < num" :key="index" class="news_li_item">
                <router-link :to="{ name: 'NewsDetail' }">
                    <div class="news_li_cont">
                        <h2 class="news_li_title fl">{{ item.title }}</h2>
                        <span class="news_li_time fr">{{ item.time }}</span>	
                    </div>
                </router-link>
            </li>
        </ul>
	</div>
</template>

<script>
	export default {
        name: "newsList",
        props: {
			// 资讯列表
			data:{
				type: Array,
				default: []
            },
            // 显示数量
            num:{
                type: Number,
                default: 5
            }
		},
		data(){
			return{}
		}
	};
</script>

<style lang="less">
	// 引入通用设置文件
    @import "../../assets/less/setting";
    @import "../../assets/less/news_list";
</style>
