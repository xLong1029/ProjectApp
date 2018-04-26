<template>
	<div id="bookmark">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 书签列表 -->
			<ul v-if="!noList" class="news_list">
				<li v-for="(item, index) in newsList" v-if="index < listNum" :key="index" class="news_li_item"  @click="gotoDetail(item.id)">
					<div class="news_li_cont">
						<h2 class="news_li_title fl">{{ item.title }}</h2>
						<span class="news_li_time fr">{{ item.publishDate }}</span>	
					</div>
				</li>
			</ul>
			<div v-else class="no_collect_list">
				<p>暂无收藏内容</p>
			</div>
			<!-- 操作栏 -->
			<div id="operateBar">
				<ul class="operate_bar">
					<li class="operate_item">
						<i class="operate_icon icon_edit_line"></i>
						<span class="operate_title">更改组名</span>
					</li>
					<li class="operate_item">
						<i class="operate_icon icon_delete_line"></i>
						<span class="operate_title">删除文章</span>
					</li>
				</ul>
			</div>
			<!-- 加载更多 -->
			<div v-if="loadMore" class="load_more">
				<Loading></Loading>
			</div>
		</div>
		<!-- 返回顶部 -->
		<BackTop v-show="showTopBtn"></BackTop>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import BackTop from "components/Common/BackTop.vue"
	// 通用JS
	import Common from 'common/common.js'
	import { SetCookie, GetCookie, GetUrlQuery } from 'common/important.js';
	// 混合
	import ScrollPage from 'mixins/scrollPage.js'
	// Api方法
	import Api from "api/news.js";

	export default {
		name: "bookmark",
		components: { Loading, BackTop },
		mixins: [ ScrollPage ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 无内容
				noList: true,
				// 资讯列表
				newsList: [],
				// 资讯数量
				listNum: 20
			}
		},
		// 进入路由前导航钩子
        beforeRouteEnter (to, from, next) {
            if(GetCookie('project_token')) next();
			else next({ name : 'UnLogined' });
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
				let title = GetUrlQuery('name');
				if(title) this.$store.commit('SET_NAV_TITLE', title);
                else this.$store.commit('SET_NAV_TITLE', '书签列表');
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
						this.newsList = res.data.result;
						this.noList = false;						

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
				Common.GotoPage('NewsDetail', { id: id, type: 2 }, this);
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
	@import "../../../assets/less/setting";
	@import "../../../assets/less/news_list";
	@import "../../../assets/less/operate_bar";

	/* no_collect_list */

	.no_collect_list{
		background: #fff;
		padding: 100*@rem 0;

		p{
			text-align: center;
		}
	}

	/* bookmark_list */
	
	.book_list_item{
		background: #fff;
		padding: 10*@rem;
		border-bottom: @border_light;
		cursor: pointer;

		.list_icon{			
			color: @ic_gray_color;

			.mr(5);
		}

		.icon_next{
			color: #ddd;
			float: right;

			.mt(5);
			.ft(12);
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

	/* layout */
	@media screen and (min-width: 960px) {
		.operate_bar {
			width: @wrapper_max_w;
		}
	}
</style>
