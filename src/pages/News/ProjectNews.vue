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
	// 组件
	import Loading from "components/Common/Loading.vue";
	import Copyright from "components/Common/Copyright.vue";
	import BackTop from "components/Common/BackTop.vue";
	// Api方法
	import Api from "api/api.js";
	// 混合
	import ScrollPage from 'mixins/scrollPage.js'
	import Modal from "mixins/modal.js"
	// 通用js
	import Common from 'common/common.js'
	import { SetCookie, GetCookie } from 'common/important.js'

	export default {
		name: "projectNews",
		components: { Loading, Copyright, BackTop },
		mixins: [ ScrollPage, Modal ],
		data() {
			return{
				// 是否加载页面
				pageLoading: false,
				// 资讯列表
				newsList: []
			}
		},
		created(){
			this.init();
		},
		mounted(){
			// 监听滚动事件
			window.addEventListener('scroll', this.scrollPage);
		},
		methods:{
			// 初始化
			init(){
				scrollTo(0, 0);
				this.$store.commit('SET_GOBACK_ROUTE', null);
				this.getListData(this.listNum, false);
			},
			// 获取列表内容, num: 获取个数，more:是否加载更多
			getListData(num, more){
				// 加载页面
				if(!more) this.pageLoading = true;
				else this.loadMore = true

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
							// 再无数据可添加
							if(this.listNum >= res.data.dataCount) this.loadMoreNow = true;
							else this.loadMoreNow = false;
							// 停止加载更多
							this.loadMore = false;
						}
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 页面滚动
			scrollPage(){
				let	scrollTop = $(window).scrollTop(),
					windowH = $(window).height(),
					documentH = $(document).height();

				if(scrollTop + windowH > documentH - 40){
					if(!this.loadMoreNow) {
						this.loadMoreNow = true;
						// 累加5条记录
						this.listNum += 5;
						// 跳转当前页，累计新闻条数
						Common.GotoPage('ProjectNews', { n : this.listNum }, this);
						// 获取更多内容
						this.getListData(this.listNum, true);
					}
				}
				if(scrollTop > windowH/2){
					this.showTopBtn = true;
				}
				else{
					this.showTopBtn = false;
				}
			}
		},
		destroyed(){
			// 移除滚动事件
			window.removeEventListener("scroll",this.scrollPage);
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
