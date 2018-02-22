<template>
	<div id="newsDetail" class="cont_frame">
		<h2 class="article_title"> 资讯标题 </h2>
        <section class="article_time">日期：2017/12/4</section>
        <section class="article_tags">标签：申报、项目资讯、通知</section>
        <section class="article_cont">
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
        </section>
        <section class="article_org_link">原文链接：<a href="https://www.baidu.com/">https://www.baidu.com/</a></section>
        <section class="select_artc">
            <a class="fl"><i class="icon-back"></i> 查看上一篇</a>
            <a class="fr">查看下一篇 <i class="icon-next"></i></a>
            <div class="clearfix"></div>
        </section>
	</div>
</template>

<script>
	export default {
		name: "newsDetail",
		data(){
			return{

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
