<template>
	<div id="newsList">
        <ul class="news_list">
            <li v-for="(item, index) in data" :key="index" class="news_li_item">
                <router-link :to="{ name: 'NewsDetail' }">
                    <div class="news_li_cont">
                        <span class="news_li_title fl">{{ item.title }}</span>
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
