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
                    <div :class="['move_item_collect', item.isCollect ? 'is_collected' : '']"  @click="collectAticle(index, item)">
                        <span v-if="item.isCollect">取消收藏</span>
                        <span v-else>收藏</span>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 选择框 -->
        <ScrollModal :show="showSelectModel">
            <!-- 标题栏 -->
            <button slot="h_left" class="button cancel_btn" @click="hideSelectModel">取消</button>
            <div slot="h_center">请选择收藏夹分组</div>
            <button slot="h_right" class="button comfir_btn" @click="saveCollect">完成</button>
            <div slot="content">
                <div class="add_group" @click="showAddGroup"> + 新增分组</div>
                <!-- 加载数据 -->
                <Loading v-if="listLoading"></Loading>
                <!-- 选择列表 -->
                <ul v-else class="group_list">                        
                    <li :class="['group_list_item', selectIndex == index ? 'active' : '']" v-for="(item, index) in groupList" :key="index" @click="getGroupSelect(item, index)">{{ item.name }}</li>
                </ul>
            </div>
        </ScrollModal>
        <!-- 取消收藏提示窗口 -->
        <PopModel :show="showDelComfir" @close="hideDelModel">
            <div slot="content"> 确认取消该收藏吗？ </div>
            <div slot="footer">				
                <button class="button fr" style="width: 48%;" @click="cancelCollect">确定</button>
                <button class="button cancel_btn fl" style="width: 48%;" @click="hideDelModel(false)">取消</button>
            </div>
        </PopModel>
        <!-- 新增分组窗口 -->
        <PopModel :show="showAddModel" @close="hideAddModel">
            <div slot="content">
                <input ref="groupName" type="text" v-model="groupName" placeholder="请填写分组名称"/>
            </div>
            <div slot="footer">				
                <button class="button fr" style="width: 48%;" @click="addGroup">确定</button>
                <button class="button cancel_btn fl" style="width: 48%;" @click="hideAddModel(false)">取消</button>
            </div>
        </PopModel>      
	</div>
</template>

<script>
    // 组件
    import ScrollModal from "components/Modal/ScrollModal.vue";
    import PopModel from "components/Modal/PopModal.vue";
    import Loading from "components/Common/Loading.vue";
    // Api方法
    import Api from "api/news.js";
    // 混合
    import Modal from "mixins/modal.js";
    import Collect from "mixins/collect.js";
    // 通用JS
    import Common from 'common/common.js';
    import { SetCookie, GetLocalS } from 'common/important.js';
    
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
        components: { ScrollModal, PopModel, Loading },
        mixins: [ Modal, Collect ],
		data(){
			return{
                // x轴滑动开始位置
                movewStartX: 0,
                // x轴滑动结束位置
                moveEndX: 0,
                // x轴滑动距离
                moveX: 0,
                // 当前数据在列表中的索引值
                index: 0,
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
            // 移动处理
            moveDeal(index, item){
                // console.log(this.moveX);

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
            },
            // 收藏文章
            collectAticle(index, item){
                this.index = index;
                this.newsId = item.id;
                this.newsCont.isCollect = item.isCollect;
                this.collect();
            },
            // 保存收藏
            saveCollect(){
                if(this.newsCont.group.id == 0){
                    this.showWarnModel('请选择分组', 'warning');
                    return false;
                }

                Api.AddArticle({
                    declareId: this.newsId,
                    groupId: this.newsCont.group.id
                })
                .then(res => {
                    if(res.code == 200) {
                        $('.move_item').eq(index).find('.move_item_collect').addClass('is_collected');

                        this.hideSelectModel();
                    }
                    else this.showWarnModel(res.msg, 'warning');
                })
                .catch(err => console.log(err))
            },
        }
	};
</script>

<style lang="less">
	// 引入通用设置文件
    @import "../../assets/less/setting";
    @import "../../assets/less/news_list";
    @import "../../assets/less/collect_set";

    .is_collected{
        color: #fff;
    }
</style>
