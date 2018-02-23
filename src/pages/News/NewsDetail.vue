<template>
	<div id="newsDetail">
        <!-- 加载数据 -->
		<Loading v-if="loading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
            <div class="cont_frame">
                <!-- 资讯标题 -->
                <h2 class="article_title"> 资讯标题 </h2>
                <!-- 资讯信息 -->
                <section class="article_time">日期：2017/12/4</section>
                <section class="article_tags">标签：申报、项目资讯、通知</section>
                <!-- 资讯内容 -->
                <section class="article_cont">
                    <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
                    <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
                    <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
                    <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
                </section>
                <!-- 原文链接 -->
                <section class="article_org_link">原文链接：<a href="https://www.baidu.com/">https://www.baidu.com/</a></section>
                <!-- 文章选择 -->
                <section class="select_artc">
                    <a class="fl"><i class="icon-back"></i> 查看上一篇</a>
                    <a class="fr">查看下一篇 <i class="icon-next"></i></a>
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

	export default {
        name: "newsDetail",
        components: { Loading, Copyright },
		data(){
			return{
                // 是否加载内容
                loading: false,
			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '资讯详情');
		}
	};
</script>

<style lang="less" scoped>
    @import "../../assets/less/setting";
    @import "../../assets/less/article";
</style>
