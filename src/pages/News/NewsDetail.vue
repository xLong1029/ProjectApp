<template>
	<div id="newsDetail">
        <!-- 加载数据 -->
		<Loading v-if="loading"></Loading>
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
                <section class="article_org_link">原文来自：<a :href="newsCont.url">{{ newsCont.webSite }} (点击查看原文)</a></section>
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
    import $ from "jquery";
    // 组件
	import Loading from "components/Common/Loading.vue";
    import Copyright from "components/Common/Copyright.vue";
    // Api方法
    import Api from "api/api.js";
    // 获取url参数方法
    import { GetUrlQuery } from "common/important.js";
    // 通用js
    import Common from 'common/common.js'

	export default {
        name: "newsDetail",
        components: { Loading, Copyright },
		data(){
			return{
                // 是否加载内容
                loading: false,
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
            this.$store.commit('SET_NEED_SCORLL_PAGE', false);
            this.$store.commit('SET_NAV_TITLE', '资讯详情');
            this.getNewsCont(GetUrlQuery('id'));
        },
        methods:{
            // 获取资讯内容
            getNewsCont(newsId){
                // 开始加载
				this.loading = true;

				Api.DeclareDetail(newsId)
				.then(res => {
					if(res.code == 200){
                        this.newsCont = res.data;                        
						// 停止加载
                        this.loading = false;
                        
                        // 更新结束后再轮播
						this.$nextTick(() => {
                            // 移除img标签，因为爬虫爬到的文章图片路径问题无法显示
							$('.article_cont').find('img').remove();
						})
					}
					else {
                        // 停止加载
                        this.loading = false;
                        this.newsCont.htmlContext = res.msg;
                    }
				})
				.catch(err => {
					this.pageLoading = false; 
					alert('网络出错，加载失败！');
				})
            },
            // 查看上一篇
            readPrev(id){
                if(id !=0){
                    Common.GotoPage('NewsDetail', { id : id }, this);
                    this.getNewsCont(id);
                }
                else alert('已经是第一篇啦！');
            },
            // 查看下一篇
            readNext(id){
                console.log(id);
                if(id !=0){
                    Common.GotoPage('NewsDetail', { id : id }, this);
                    this.getNewsCont(id);
                }
                else alert('已经是最后一篇啦！');
            }
        }
	};
</script>

<style lang="less" scoped>
    @import "../../assets/less/setting";
    @import "../../assets/less/article";
</style>
