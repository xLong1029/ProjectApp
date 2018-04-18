<template>
	<div id="projectNews">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 资讯列表 -->
			<ul class="news_list">
				<li v-for="(item, index) in newsList" :key="index" class="news_li_item proj_news" @click="gotoDetail(item.id)">
					<div class="news_li_cont fl">
						<h2 class="news_li_title">{{ item.title }}</h2>
						<div class="news_li_tag">
							<span v-for="(tag, i) in item.keyWords" :key="i" class="tag fl">{{ tag }}</span>
							<span class="news_li_time fr">{{ item.publishDate }}</span>	
						</div>
					</div>
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
	import Api from "api/news.js";
	// 混合
	import ScrollPage from 'mixins/scrollPage.js'
	import Modal from "mixins/modal.js"
	// 通用js
	import Common from 'common/common.js'
	import { GetCookie, SetCookie, DelCookie } from 'common/important.js'

	export default {
		name: "projectNews",
		components: { Loading, Copyright, BackTop },
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
		// 导航离开该组件的对应路由时调用，可以访问组件实例 `this`
        beforeRouteLeave (to, from, next) {
			// 进入资讯详情页
			if(to.name === 'NewsDetail') next();
			else{
				// 清除列表数量和滚动高度缓存
				DelCookie('listNum');
				DelCookie('scrollH');				
				next();
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
				// 重置返回路由
				this.$store.commit('SET_GOBACK_ROUTE', { name: null, query: {} });

				// 从缓存获取列表数量
				let getListNum = GetCookie('listNum');
				if(getListNum){
					this.listNum = parseInt(getListNum);
				}				

				// 从缓存获取列表滚动高度
				let getScrollH = GetCookie('scrollH');
				if(getScrollH){
					this.listScrollH = parseInt(getScrollH);
				}

				this.getListData(this.listNum, false);
			},
			// 获取列表内容， num: 请求数量，more：是否加载更多
			getListData(num, more){
				// 加载页面
				if(more) this.loadMore = true;
				else this.sLoading = true;

				Api.DeclareList({
					pageNum: 1,
					pageSize: num
				})
				.then(res => {
					if(res.code == 200){
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
			},
			// 页面滚动
			scrollPage(){				
				let	scrollTop = $(window).scrollTop();
				
				// 缓存有滚动高度，未到该高度不触发后面的操作
				if(this.listScrollH > 0 && scrollTop <= this.listScrollH) return false;

				let windowH = $(window).height(),
					documentH = $(document).height();

				if(scrollTop + windowH > documentH - 40){
					if(!this.loadMoreNow) {
						this.loadMoreNow = true;
						// 累加5条记录
						this.listNum += 5;
						// 列表数量存缓存
						SetCookie('listNum', this.listNum);		
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
			},
			// 跳转资讯详情页
			gotoDetail(id){
				// 列表滚动高度存缓存
				SetCookie('scrollH', $(window).scrollTop());
				Common.GotoPage('NewsDetail', { id: id }, this);
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
