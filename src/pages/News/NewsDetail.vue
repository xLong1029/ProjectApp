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
                <section class="article_org_link">原文来自：<a :href="newsCont.url" target="_blank">{{ newsCont.webSite }} (点击查看原文)</a></section>
                <!-- 文章选择 -->
                <section class="select_artc">
                    <a class="fl" @click="readPrev(newsCont.prevID)"><i class="icon-back"></i> 查看上一篇</a>
                    <a class="fr"@click="readNext(newsCont.nextID)">查看下一篇 <i class="icon-next"></i></a>
                    <div class="clearfix"></div>
                </section>
            </div>
            <!-- 版权信息 -->
            <Copyright></Copyright>
		</div>
	</div>
</template>

<script>
    // 组件
	import Loading from "components/Common/Loading.vue";
    import Copyright from "components/Common/Copyright.vue";    
    // Api方法
    import Api from "api/api.js";
    // 获取url参数方法
    import { GetUrlQuery } from "common/important.js";
    // 通用js
    import Common from 'common/common.js'
    // 混合
	import Modal from "mixins/modal.js"

	export default {
        name: "newsDetail",
        components: { Loading, Copyright },
        mixins: [ Modal ],
		data(){
			return{
                // 是否加载内容
                pageLoading: false,
                newsCont: {
                    title: '暂无标题',
                    htmlContext: '暂无内容',
                    keyWord: '暂无标签',
                    publishDate: '暂无日期',
                    url: null,
                    webSite: '暂无来源',
                    prevID: 0,
                    nextID: 0
                },
			}
		},
		created(){
            // 从别的滚动页面返回会导致有滚动问题，所以要滚动到顶部;
			scrollTo(0, 0);
            this.$store.commit('SET_NAV_TITLE', '资讯详情');
            this.getNewsCont(GetUrlQuery('id'));
        },
        methods:{
            // 获取资讯内容
            getNewsCont(newsId){
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
                    }
				})
				.catch(err => console.log(err))
            },
            // 查看上一篇
            readPrev(id){
                if(id !=0){
                    Common.GotoPage('NewsDetail', { id : id }, this);
                    this.getNewsCont(id);
                }
                else this.showWarnModel('已经是第一篇啦！', 'warning');
            },
            // 查看下一篇
            readNext(id){
                console.log(id);
                if(id !=0){
                    Common.GotoPage('NewsDetail', { id : id }, this);
                    this.getNewsCont(id);
                }
                else this.showWarnModel('已经是最后一篇啦！', 'warning');
            }
        }
	};
</script>

<style lang="less" scoped>
    @import "../../assets/less/setting";
    @import "../../assets/less/article";
</style>
