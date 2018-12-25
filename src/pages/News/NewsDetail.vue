<template>
	<div id="newsDetail">
        <!-- 导航栏 -->
		<NavBar title="资讯详情" :is-second-page="true"></NavBar>
        <!-- 页面内容 -->
		<div class="content">
            <!-- 加载数据 -->
            <Loading v-if="pageLoading"></Loading>
            <!-- 加载结束 -->
            <div v-else>
                <div class="cont_frame">
                    <!-- 资讯标题 -->
                    <h2 class="article_title">{{ newsCont.title }}</h2>
                    <!-- 资讯信息 -->
                    <section class="article_time">日期：{{ newsCont.publishDate }}</section>
                    <section class="article_tags">标签：{{ newsCont.keyWord }}</section>
                    <!-- 资讯内容 -->
                    <section class="article_cont" v-html="newsCont.htmlContext">{{ newsCont.htmlContext }}</section>
                    <!-- 提示 -->
                    <section class="article_hint">* 温馨提示：请到源网址下载附件</section>
                    <!-- 原文链接 -->
                    <section class="article_org_link">原文来自：
                        <a :href="newsCont.url" target="blank">{{ newsCont.webSite }} <span v-if="newsCont.url">(点击查看原文)</span></a>
                    </section>
                    <!-- 文章选择 -->
                    <section class="select_artc">
                        <a class="fl" @click="readPrev(newsCont.prevID)"><i class="icon_back"></i> 查看上一篇</a>
                        <a class="fr" @click="readNext(newsCont.nextID)">查看下一篇 <i class="icon_next"></i></a>
                        <div class="clearfix"></div>
                    </section>
                </div>
                <!-- 操作栏 -->
                <div id="operateBar">
                    <ul class="operate_bar">
                        <li class="operate_item" @click="collect">                  
                            <div v-if="newsCont.isCollect">
                                <i class="operate_icon icon_collection is_collected"></i>
                                <span class="operate_title is_collected">已收藏</span>
                            </div>
                            <div v-else>
                                <i class="operate_icon icon_collection_line"></i>
                                <span class="operate_title">收藏文章</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
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
	</div>
</template>

<script>
    // 组件
    import NavBar from "components/Common/NavBar.vue";
	import Loading from "components/Common/Loading.vue";
    import ScrollModal from "components/Modal/ScrollModal.vue";
    import PopModel from "components/Modal/PopModal.vue";
    // Api方法
    import Api from "api/news.js";
    // 混合
    import Modal from "mixins/modal.js";
    import Collect from "mixins/collect.js";
    // 获取url参数方法
    import { GetUrlQuery } from "common/important.js";
    // 通用js
    import Common from 'common/common.js'

	export default {
        name: "newsDetail",
        components: { NavBar, Loading, ScrollModal, PopModel },
        mixins: [ Modal, Collect ],
		data(){
			return{
                // 是否加载内容
                pageLoading: false,
                // 上级页面Type
                pageType: null,
                // 资讯编号
                newsId: 0,
                // 资讯内容
                newsCont: {
                    group:{
                        id: 0,
                        name: ''
                    },
                    title: '暂无标题',
                    htmlContext: '暂无内容',
                    keyWord: '暂无标签',
                    publishDate: '暂无日期',
                    url: null,
                    webSite: '暂无来源',
                    prevID: 0,
                    nextID: 0,
                    isCollect: false
                },
                // 资讯已删除
                isDeleted: false,
                // 是否显示源文框
                showSoucreModel: false,
                // 资讯源链接
                newsUrl: '',
			}
		},
		created(){
            this.init();
        },
        methods:{
            init(){
                this.pageType = GetUrlQuery('type');
                this.newsId = GetUrlQuery('newsId');
                // type == 1 说明是从资讯列表过来的
                if(this.pageType == 1){
                    // 更新返回路由
                    this.$store.commit('SET_GOBACK_ROUTE', { name: 'ProjectNews', query: {} });
                }
                // type == 2 说明是从消息中心过来的
                if(this.pageType == 2){
                    // 更新返回路由
                    this.$store.commit('SET_GOBACK_ROUTE', { name: 'Message', query: {} });
                }
                            
                this.getNewsCont(this.newsId);               
            },
            // 获取资讯内容
            getNewsCont(newsId){
                // 重置资讯编号
                this.newsId = newsId;
                // 开始加载
				this.pageLoading = true;

				Api.DeclareDetail(newsId)
				.then(res => {
					if(res.code == 200){
                        this.newsCont = res.data;
                        this.isCollect = res.data.isCollect;                  
						// 停止加载
                        this.pageLoading = false;
                        
                        // 更新结束后再轮播
						this.$nextTick(() => {
                            // 移除img标签，因为爬虫爬到的文章图片路径问题无法显示
							$('.article_cont').find('img').remove();
						})
                    }
					else {
                        // 停止加载
                        this.pageLoading = false;
                        this.newsCont.htmlContext = res.msg;
                        if(res.code == 0) this.isDeleted = true;
                    }
				})
				.catch(err => console.log(err))
            },
            // 查看上一篇
            readPrev(id){
                if(id !=0){
                    this.gotoArticle(id);
                }
                else this.showWarnModel('已经是第一篇啦', 'warning');
            },
            // 查看下一篇
            readNext(id){
                if(id !=0){
                    this.gotoArticle(id);
                }
                else this.showWarnModel('已经是最后一篇啦', 'warning');
            },
            // 跳转其他文章
            gotoArticle(id){
                if(this.pageType){
                    Common.GotoPage('NewsDetail', { newsId: id, type: this.pageType }, this);
                }
                else{
                    Common.GotoPage('NewsDetail', { newsId: id }, this);
                }
                this.getNewsCont(id);
            }
        }
	};
</script>

<style lang="less" scoped>
    @import "../../assets/less/setting";
    @import "../../assets/less/article";
    @import "../../assets/less/operate_bar";
    @import "../../assets/less/collect_set";

    .operate_item {
		width: 100%;
    }

    .news_source{
        margin-top: @navbar_h;
        
        .news_source_cont{
            height: 100vh;
        }
    }
</style>
