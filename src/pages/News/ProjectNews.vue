<template>
	<div id="projectNews">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 资讯列表 -->
			<ul class="news_list">
				<li v-for="(item, index) in newsList" :key="index" class="news_li_item proj_news">
					<router-link :to="{ name : 'NewsDetail', query: { id : item.id } }">
						<div class="news_li_cont fl">
							<h2 class="news_li_title">{{ item.title }}</h2>
							<div class="news_li_tag">
								<span v-for="(tag, i) in item.keyWords" :key="i" class="tag fl">{{ tag }}</span>
								<span class="news_li_time fr">{{ item.publishDate }}</span>	
							</div>
						</div>
					</router-link>			
				</li>
			</ul>
			<div class="clearfix"></div>
			<!-- 加载更多 -->
			<div v-if="loadMore" class="load_more">
				<Loading></Loading>
			</div>
			<!-- 版权信息 -->
			<Copyright></Copyright>
			<!-- 返回顶部 -->
			<BackTop v-show="showTopBtn"></BackTop>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	// 组件
	import Loading from "components/Common/Loading.vue";
	import Copyright from "components/Common/Copyright.vue";
	import BackTop from "components/Common/BackTop.vue";
	// Api方法
	import Api from "api/api.js";
	// 页面滚动与加载
    import scrollPage from 'mixins/scrollPage.js'

	export default {
		name: "projectNews",
		components: { Loading, Copyright, BackTop },
		mixins: [ scrollPage ],
		data() {
			return{
				// 是否加载页面
				pageLoading: false,
				// 资讯列表
				newsList: []
			}
		},
		created(){
			this.$store.commit('SET_NEED_SCORLL_PAGE', true);
			this.scrollPage();
			this.getListData(this.listNum, false);
		},
		methods:{
			// 获取列表内容, num: 获取个数，more:是否加载更多
			getListData(num, more){
				// 加载页面
				if(!more) this.pageLoading = true;
				else this.loadMore = true;

				Api.DeclareList({
					pageNum: 1,
					pageSize: num
				})
				.then(res => {
					if(res.code == 200){
						this.newsList = res.data.result;

						// 停止页面加载
						this.pageLoading = false;
												
						if(more){
							this.loadMoreNow = false;
							// 停止加载更多
							this.loadMore = false;
						}
					}
					else alert(res.msg);
				})
				.catch(err => {
					this.pageLoading = false; 
					alert('网络出错，加载失败！');
				})
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";
	@import "../../assets/less/news_list";

	.proj_news{
		.news_li_title{
			width: 100%;
			.mb(5);
			.ht(24);
		}

		.news_li_publishDate{
			.mt(5);
		}
	}

	/* 加载更多 */
	.load_more{
		position: relative;
		border-bottom: @border_deep;
		.ht(80);

		.loading{
			position: absolute;
		}
	}
</style>
