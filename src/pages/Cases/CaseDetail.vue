<template>
	<div id="caseDetail" class="cont_frame">
        <!-- 项目标题 -->
		<h2 class="article_title"> 项目标题 </h2>
        <!-- 项目信息 -->
        <section class="article_time">申报日期：2017/12/4</section>
        <section class="article_tags">立项专项：科技立项</section>
        <!-- 项目内容 -->
        <section class="article_cont">专属华蓝集团（公司名称）项目。</section>
        <!-- 项目选择 -->
        <section class="select_artc">
            <a class="fl"><i class="icon-back"></i> 查看上一项</a>
            <a class="fr">查看下一项 <i class="icon-next"></i></a>
            <div class="clearfix"></div>
        </section>
        <!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
    import Copyright from "components/Common/Copyright.vue";
	export default {
        name: "caseDetail",
        components: { Copyright },
		data(){
			return{

			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '项目详情');
		}
	};
</script>

<style lang="less" scoped>
    @import "../../assets/less/setting";
    @import "../../assets/less/article";

    .article_cont{
        .mb(10);
    }
</style>
