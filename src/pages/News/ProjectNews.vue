<template>
	<div id="projectNews">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 资讯列表 -->
			<NewsList :data="newsList" :num="listNum" :show-tag="true" :page-type="1"></NewsList>
			<div class="clearfix"></div>
			<!-- 加载更多 -->
			<div v-if="loadMore" class="load_more">
				<Loading></Loading>
			</div>
			<!-- 返回顶部 -->
			<BackTop v-show="showTopBtn" :hasTabBar="false"></BackTop>
		</div>
		<div style="height:20px"></div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import BackTop from "components/Common/BackTop.vue";
	import NewsList from "components/News/NewsList.vue";
	// Api方法
	import Api from "api/news.js";
	import Msg from "api/message.js";
	// 混合
	import ScrollPage from 'mixins/scrollPage.js';
	import Modal from "mixins/modal.js";
	// 通用js
	import Common from 'common/common.js';
	import { GetLocalS, SetLocalS, DelLocalS } from 'common/important.js';

	export default {
		name: "projectNews",
		components: { Loading, BackTop, NewsList },
		mixins: [ ScrollPage, Modal ],
		data() {
			return{
				// 是否加载页面
				pageLoading: false,
				// 资讯列表
				newsList: [],
				// 列表滚动高度
				listScrollH: 0,
			}
		},
		// 离开路由前导航钩子
        beforeRouteLeave (to, from, next) {
			// alert('资讯列表下一个路由：'+to.name);
			// 进入资讯详情页
			if(to.name === 'NewsDetail') next();
			else{
				// 清除列表数量和滚动高度缓存
				DelLocalS('listNum');
				DelLocalS('scrollH');				
				next();
			}
        },
		created(){
			this.init();
			this.scrollHSet();
		},
		mounted(){
			// 监听滚动事件
			window.addEventListener('scroll', this.scrollPage);
		},
		methods:{
			// 初始化
			init(){
				// 重置返回路由
				this.$store.commit('SET_GOBACK_ROUTE', { name: null, query: {} });
				this.getMsg();
			},
			// 获取未读消息
			getMsg(){
				Msg.GetMessage()
				.then(res => {
					if(res.code == 200) this.$store.commit('SET_UN_READ_COUNT', res.data.unRead);
					else this.$store.commit('SET_UN_READ_COUNT', 0);
				})
				.catch(err => console.log(err))
			},
			// 获取列表内容， num: 请求数量，more：是否加载更多
			getListData(num, more){
				// 加载页面
				if(more) this.loadMore = true;
				else this.pageLoading = true;

				Api.DeclareList({
					pageNum: 1,
					pageSize: num
				})
				.then(res => {
					if(res.code == 200){						
						// 调整数据内容
						this.newsList = res.data.result;

						// 是否加载更多
						if(more){
							// 再无数据可添加
							if(this.listNum >= res.data.dataCount) this.loadMoreNow = true;
							else this.loadMoreNow = false;
							// 停止加载更多
							this.loadMore = false;
						}
						else{
							// 停止页面加载
							this.pageLoading = false;

							// 获取到缓存滚动高度
							if(this.listScrollH > 0){
								var _this = this;
								this.$nextTick(() => {
									scrollTo(0, _this.listScrollH);	
								})
							}
						}
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
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
