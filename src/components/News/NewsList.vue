<template>
	<div id="newsList">
        <ul class="news_list">
            <li v-for="(item, index) in data" v-if="index < num" :key="index" class="news_li_item" @click="toDetail(item)">
                <div class="news_li_cont">
                    <h2 :class="['news_li_title', showTag ? '' : 'fl']">{{ item.title }}</h2>
                    <div v-if="showTag" class="news_li_tag">
                        <span v-for="(tag, i) in item.keyWords" :key="i" class="tag fl">{{ tag }}</span>
                        <span class="news_li_time fr">{{ item.time }}</span>	
                    </div>
                    <span v-else class="news_li_time fr">{{ item.time }}</span>	
                </div>
            </li>
        </ul>
	</div>
</template>

<script>
    // 通用JS
    import Common from 'common/common.js';
    
	export default {
        name: "newsList",
        /* 
        * 获取父级传值
        * 资讯列表 data
        * 显示数量 num
        * 是否显示标签 showTag
        */
        props: {
			data:{
				type: Array,
				default: []
            },
            num:{
                type: Number,
                default: 5
            },
            showTag:{
                type: Boolean,
                default: true
            }
		},
		data(){
			return{}
        },
        methods:{
            // 跳转到详情页
			toDetail(item){
				Common.GotoPage('NewsDetail', { id: item.id }, this);
			},
        }
	};
</script>

<style lang="less">
	// 引入通用设置文件
    @import "../../assets/less/setting";
    @import "../../assets/less/news_list";
</style>
