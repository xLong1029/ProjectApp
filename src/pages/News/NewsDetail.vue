<template>
	<div id="newsDetail" class="cont_frame">
		<h2 class="news_title"> 资讯标题 </h2>
        <section class="news_time">日期：2017/12/4</section>
        <section class="news_tags">标签：申报、项目资讯、通知</section>
        <section class="news_cont">
            <p>这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容，这里是资讯内容。</p>
        </section>
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
        margin-bottom: 10*@rem;
        color:@base_color;
        font-size: 16*@rem;
    }

    .news_time{
        margin-bottom: 6*@rem;
    }

    .news_time, .news_tags{
        color: #888;
        font-size: 12*@rem;
    }

    .news_tags{
        padding-bottom: 10*@rem;
        border-bottom:@border_deep; 
    }

    .news_cont{
        margin-top: 10*@rem;

        p{
            text-indent: 2em;
        }
    }

    /* select_article */

    .select_artc{
        padding: 8*@rem 0;
        a{
            color:@base_color;
        }

        i{
            font-size: 12*@rem;
        }
    }
</style>
