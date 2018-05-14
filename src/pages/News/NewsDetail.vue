<template>
	<div id="newsDetail">
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
                <section class="article_hint">* 温馨提示：附件类内容建议到源网址下载</section>
                <!-- 原文链接 -->
                <section class="article_org_link">原文来自：
                    <a :href="newsCont.url" target="_blank">{{ newsCont.webSite }} <span v-if="newsCont.url">(点击查看原文)</span></a>
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
            <!-- 选择框 -->
            <ScrollModal :show="showModal">
                <!-- 标题栏 -->
                <button slot="h_left" class="button cancel_btn" @click="hideModal">取消</button>
                <div slot="h_center">请选择收藏夹分组</div>
                <button slot="h_right" class="button comfir_btn" @click="saveCollect">完成</button>
                <!-- 选择列表 -->
                <ul slot="content" class="group_list">
                    <li :class="['group_list_item', selectIndex == index ? 'active' : '']" v-for="(item, index) in groupList" :key="index" @click="getGroupSelect(item, index)">{{ item.name }}</li>
                </ul>
            </ScrollModal>
		</div>
	</div>
</template>

<script>
    // 组件
	import Loading from "components/Common/Loading.vue";
    import ScrollModal from "components/Modal/ScrollModal.vue"
    // Api方法
    import Api from "api/news.js";
    // 混合
    import Modal from "mixins/modal.js";
    // 获取url参数方法
    import { GetCookie, GetUrlQuery } from "common/important.js";
    // 通用js
    import Common from 'common/common.js'

	export default {
        name: "newsDetail",
        components: { Loading, ScrollModal },
        mixins: [ Modal ],
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
                // 显示弹窗
                showModal: false,
                // 分组列表
                groupList: [],
                // 收藏的分组编号
                groupId: 0,
                // 选择值索引
                selectIndex: -1
			}
		},
		created(){
            this.init();
        },
        methods:{
            init(){
                this.$store.commit('SET_NAV_TITLE', '资讯详情');
                this.pageType = GetUrlQuery('type');
                this.newsId = GetUrlQuery('id');
                // type == 1 说明是从资讯列表过来的
                if(this.pageType == 1){
                    // 更新返回路由
                    this.$store.commit('SET_GOBACK_ROUTE', { name: 'ProjectNews', query: {} });
                }
                            
                this.getNewsCont(this.newsId);
                this.getGroups();                
            },
            // 获取分组信息
            getGroups(){
                Api.GetGroups()
				.then(res => {
					if(res.code == 200){
						this.groupList = res.data;
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
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
                    Common.GotoPage('NewsDetail', { id : id, type: this.pageType }, this);
                    this.getNewsCont(id);
                }
                else this.showWarnModel('已经是第一篇啦！', 'warning');
            },
            // 查看下一篇
            readNext(id){
                if(id !=0){
                    Common.GotoPage('NewsDetail', { id : id, type: this.pageType }, this);
                    this.getNewsCont(id);
                }
                else this.showWarnModel('已经是最后一篇啦！', 'warning');
            },
            // 收藏文章
            collect(){
                // 若已收藏则不做任何操作
                if(this.isCollected) return true;
                if(this.isDeleted) this.showWarnModel('已删除的资讯不可再收藏!', 'warning');
                // 判断是否已登录
                if(GetCookie('project_token')) {
                    this.showModal = true;
                }
			    else this.showWarnModel('登录账户才可以收藏！', 'warning');
            },
            // 关闭弹窗
            hideModal(){
                this.showModal = false;
                this.groupId = 0;
                this.selectIndex = -1;
            },
            // 选择分组
            getGroupSelect(item, index){
                this.groupId = item.id;
                this.selectIndex = index;
            },
            // 保存收藏
            saveCollect(){
                Api.AddArticle({
                    declareId: this.newsId,
                    groupId: this.groupId
                })
				.then(res => {
					if(res.code == 200) {
                        this.getNewsCont(this.newsId);
                        this.hideModal();
                    }
					else this.showWarnModel(res.msg, 'warning');
				})
                .catch(err => console.log(err))
            }
        }
	};
</script>

<style lang="less" scoped>
    @import "../../assets/less/setting";
    @import "../../assets/less/article";
    @import "../../assets/less/operate_bar";

    .operate_item {
		width: 100%;
    }
    
    .is_collected{
        color: @base_color;
    }

    .group_list{
        margin-top: @navbar_h;
        width: 100%;
    }

    .group_list_item{
        display: block;
        height: 46*@rem;
        line-height: 46*@rem;
		padding: 0 12*@rem;
		border-bottom: @border_light;
		text-align: center;
		cursor: pointer;

		&:hover{
			color: @base_color;
			background: @base_hover_color;
        }
        
        &.active{
            color: #fff;
			background: @base_color;
        }
    }
</style>
