<template>
	<div id="newsList">
        <ul class="news_list">
            <li v-for="(item, index) in data" v-if="index < num" :key="index" class="news_li_item" @click="toDetail(item)">
                <!-- 显示全部标题 -->
                <div v-if="showAllTitle" class="news_li_cont full_title">
                    <h2 class="news_li_title_all">{{ item.title }}</h2>
                    <!-- 显示标签 -->
                    <div v-if="showTag" class="news_li_tag_time">
                        <span v-for="(tag, i) in item.keyWords" :key="i" class="tag fl">{{ tag }}</span>
                        <span v-if="showDate" class="news_li_time fr">{{ item.time }}</span>	
                    </div>
                    <!-- 无标签 -->
                    <span v-if="!showTag && showDate" class="news_li_time fl">{{ item.time }}</span>	
                </div>
                <!-- 显示部分标题 -->
                <div v-else class="news_li_cont">
                    <h2 :class="['news_li_title', showTag ? 'full_width' : 'fl']">{{ item.title }}</h2>
                    <!-- 显示标签 -->
                    <div v-if="showTag" class="news_li_tag_time">
                        <span v-for="(tag, i) in item.keyWords" :key="i" class="tag fl">{{ tag }}</span>
                        <span class="news_li_time fr">{{ item.time }}</span>	
                    </div>
                    <!-- 无标签 -->
                    <span v-else class="news_li_time fr">{{ item.time }}</span>	
                </div>
            </li>
        </ul>
	</div>
</template>

<script>
    // 通用JS
    import Common from 'common/common.js';
    import { SetCookie } from 'common/important.js';
    
	export default {
        name: "newsList",
        /* 
        * 获取父级传值
        * 资讯列表 data
        * 显示数量 num
        * 是否显示标签 showTag
        * 是否显示全部标题 showAllTitle
        * 是否显示日期 showDate
        * 页面类型 pageType: 1 父级页面是资讯列表页, 2 父级页面是书签页
        * 是否保存页面滚动高度 saveScrollH
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
            },
            showAllTitle:{
                type: Boolean,
                default: true
            },
            showDate:{
                type: Boolean,
                default: true
            },
            pageType:{
                type: Number,
                default: null
            },
            saveScrollH: {
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
                if(this.saveScrollH){
                    // 列表滚动高度存缓存
                    SetCookie('scrollH', $(window).scrollTop());
                }
                
                if(this.pageType){
                    Common.GotoPage('NewsDetail', { id: item.id, type: this.pageType }, this);
                }
                else Common.GotoPage('NewsDetail', { id: item.id }, this);
			},
        }
	};
</script>

<style lang="less">
	// 引入通用设置文件
    @import "../../assets/less/setting";
    @import "../../assets/less/news_list";
</style>
