<template>
	<div id="newsList">
        <ul class="news_list">
            <li v-for="(item, index) in data" v-if="index < num" :key="index" class="news_li_item">
                <div
                    class="move_item"
                    @touchstart="touchStart($event, index)"
                    @touchmove="touchMove($event, index)"
                    @touchend="touchEnd($event, index, item)"
                    @mousedown="mouseDown($event, index)"
                    @mouseup="mouseUp($event, index, item)"
                >
                    <div class="move_item_cont">
                        <!-- 显示全部标题 -->
                        <div v-if="showAllTitle" class="news_li_cont full_title">
                            <h2 class="news_li_title_all">{{ item.title }}</h2>
                            <!-- 显示标签 -->
                            <div v-if="showTag" class="news_li_tag_time">
                                <span v-for="(tag, i) in item.keyWords" v-if="i < 4" :key="i" class="tag fl">{{ tag }}</span>
                                <span v-if="showDate" class="news_li_time fr">{{ item.publishDate }}</span>	
                            </div>
                            <!-- 无标签 -->
                            <span v-if="!showTag && showDate" class="news_li_time fl">{{ item.publishDate }}</span>	
                        </div>
                        <!-- 显示部分标题 -->
                        <div v-else class="news_li_cont">
                            <h2 :class="['news_li_title', showTag ? 'full_width' : 'fl']">{{ item.title }}</h2>
                            <!-- 显示标签 -->
                            <div v-if="showTag" class="news_li_tag_time">
                                <span v-for="(tag, i) in item.keyWords" v-if="i < 4" :key="i" class="tag fl">{{ tag }}</span>
                                <span class="news_li_time fr">{{ item.publishDate }}</span>	
                            </div>
                            <!-- 无标签 -->
                            <span v-else class="news_li_time fr">{{ item.publishDate }}</span>	
                        </div>
                    </div>
                    <div v-if="item.isCollect" class="move_item_collect is_collected">取消收藏</div>
                    <div v-else class="move_item_collect">收藏</div>
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
        * 页面类型 pageType: 1 父级页面是资讯列表页, 2 父级页面是消息通知页
        * 是否保存页面滚动高度 saveScrollH
        */
        props: {
			data:{
				type: Array,
				default: () => {
                    return [];
                }
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
			return{
                // x轴滑动开始位置
                movewStartX: 0,
                // x轴滑动结束位置
                moveEndX: 0,
                // x轴滑动距离
                moveX: 0
            }
        },
        methods:{
            // 跳转到详情页
			// toDetail(item){
            //     if(this.saveScrollH){
            //         // 列表滚动高度存缓存
            //         SetCookie('scrollH', $(window).scrollTop());
            //     }
                
            //     if(this.pageType){
            //         Common.GotoPage('NewsDetail', { newsId: item.id, type: this.pageType }, this);
            //     }
            //     else Common.GotoPage('NewsDetail', { newsId: item.id }, this);
            // },
            // 开始滑动
            touchStart(e, index){
                e.preventDefault();
                this.movewStartX = e.touches[0].pageX;
            },
            // 滑动事件
            touchMove(e, index){
                e.preventDefault();                
                this.moveEndX = e.changedTouches[0].pageX;
                this.moveX = this.moveEndX - this.movewStartX;
            },
            // 结束滑动
            touchEnd(e, index, item){
                this.moveDeal(index, item);
            },
            // 鼠标按下
            mouseDown(e, index){
                e.preventDefault();
                this.movewStartX = e.pageX;
            },
            // 鼠标弹起
            mouseUp(e, index, item){
                this.moveEndX = e.pageX;
                this.moveX = this.moveEndX - this.movewStartX;

                this.moveDeal(index, item);
            },
            moveDeal(index, item){
                console.log(this.moveX);

                let winW = $(window).width(),
                    thisObj = $('.move_item').eq(index),
                    contObj = thisObj.find('.move_item_cont'),
                    collectObj = thisObj.find('.move_item_collect');

                // 点击事件
                if(this.moveX == 0){
                    if(collectObj.is(':visible')){
                        thisObj.removeClass('move_left');
                        return false;
                    }
                    else{
                        window.open(item.url);
                    }
                }
                // 向左滑动
                if (this.moveX < 0) {
                    // PC配置
                    if(winW >= 960){
                        thisObj.width(720);
                        contObj.width(640);
                    }
                    else{
                        thisObj.width($(window).width() + 60);
                        contObj.width($(window).width());
                    }
                    collectObj.addClass('show');               
                    $('.move_item').removeClass('move_left');
                    thisObj.addClass('move_left');
                }

                // 向右滑动
                if (this.moveX > 0) {
                    collectObj.removeClass('show');
                    thisObj.removeClass('move_left');
                }

                // 重置滑动距离
                this.moveX = 0;
            }
        }
	};
</script>

<style lang="less">
	// 引入通用设置文件
    @import "../../assets/less/setting";
    @import "../../assets/less/news_list";
</style>
