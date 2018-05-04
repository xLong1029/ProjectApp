<template>
	<div id="bookmark">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 书签列表 -->
			<ul v-if="!noList" class="news_list">
				<NewsList :data="newsList" :num="listNum" :show-tag="false"></NewsList>
			</ul>
			<div v-else class="no_collect_list">
				<p>暂无收藏内容</p>
			</div>
		</div>
		<!-- 操作栏 -->
		<div id="operateBar">
			<ul class="operate_bar">
				<li class="operate_item">
					<i class="operate_icon icon_edit_line" @click="toStore"></i>
					<span class="operate_title">更改组名</span>
				</li>
				<li class="operate_item">
					<i class="operate_icon icon_article_setting_line" @click="toManage"></i>
					<span class="operate_title">管理文章</span>
				</li>
			</ul>
		</div>
		<!-- 返回顶部 -->
		<BackTop v-show="showTopBtn"></BackTop>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import BackTop from "components/Common/BackTop.vue";
	import NewsList from "components/News/NewsList.vue";
	// 通用JS
	import Common from 'common/common.js'
	import { DelCookie, SetCookie, GetCookie, GetUrlQuery } from 'common/important.js';
	// 混合
	import ScrollPage from 'mixins/scrollPage.js'
	// Api方法
	import Api from "api/news.js";

	export default {
		name: "bookmark",
		components: { Loading, BackTop, NewsList },
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
				listNum: 50
			}
		},
		// 进入路由前导航钩子
        beforeRouteEnter (to, from, next) {
            if(GetCookie('project_token')) next();
			else next({ name : 'UnLogined' });
        },
		// 离开路由前导航钩子
        beforeRouteLeave (to, from, next) {
			// alert('书签下一个路由：'+to.name);
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

				if(scrollTop > windowH/2){
					this.showTopBtn = true;
				}
				else{
					this.showTopBtn = false;
				}
			},
			// 跳转资讯详情页
			toDetail(id){
				// 列表滚动高度存缓存
				SetCookie('scrollH', $(window).scrollTop());
				Common.GotoPage('NewsDetail', { id: id, type: 2 }, this);
			},
			// 跳转到新增/编辑页
			toStore(){
				Common.GotoPage('CollectStore', { type: 'edit' }, this);
			},
			// 跳转到管理页
			toManage(){
				Common.GotoPage('BookmarkManage', {}, this);
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
