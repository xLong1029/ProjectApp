<template>
	<div id="newsDetail" class="cont_frame">
		<h2 class="news_title"> 资讯标题 </h2>
        <section class="news_time">日期：2017/12/4</section>
        <section class="news_tags">标签：申报、项目资讯、通知</section>
        <section class="news_cont">
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
        </section>
        <section class="news_org_link">原文链接：<a href="https://www.baidu.com/">https://www.baidu.com/</a></section>
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
	// 引入通用设置文件
    @import "../../assets/less/setting";

    /* news_detail */

    .news_title{
        color:@base_color;
        border-bottom:@border_deep;

        .mb(10);
        .ft(16);
        .pb(10);
    }

    .news_time, .news_tags{
        .mb(6);
    }

    .news_time, .news_tags, .news_org_link{
        color: #888;

        .ft(12);
    }

    .news_org_link{
        border-bottom:@border_light;
        .pb(10);

        a{
            color: @base_color;
        }
    }

    .news_cont{
        margin-top: 10*@rem;

        p{
            text-indent: 2em;
        }
    }

    /* select_article */

    .select_artc{
        .pt(10);
        .pb(5);

        a{
            color:@base_color;
        }

        i{
            .ft(12);
        }
    }
</style>
