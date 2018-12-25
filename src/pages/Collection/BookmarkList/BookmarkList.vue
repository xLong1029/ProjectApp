<template>
	<div id="bookmark">
		<!-- 导航栏 -->
		<NavBar :title="group.name" :is-second-page="true"></NavBar>
		<!-- 页面内容 -->
		<div class="content">
			<!-- 加载数据 -->
			<Loading v-if="pageLoading"></Loading>
			<!-- 加载结束 -->
			<div v-else>
				<!-- 书签列表 -->
				<div v-if="!noList">
					<NewsList :data="newsList" :num="listNum" :show-all-title="true"></NewsList>
				</div>
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
	</div>
</template>

<script>
	// 组件
	import NavBar from "components/Common/NavBar.vue";
	import Loading from "components/Common/Loading.vue";
	import BackTop from "components/Common/BackTop.vue";
	import NewsList from "components/Common/NewsList.vue";
	// 通用JS
	import Common from 'common/common.js';
	import { DelLocalS, GetLocalS, GetUrlQuery } from 'common/important.js';
	// 混合
	import ScrollPage from 'mixins/scrollPage.js';
	import Modal from "mixins/modal.js";
	// Api方法
	import Api from "api/collection.js";

	export default {
		name: "bookmark",
		components: { NavBar, Loading, BackTop, NewsList },
		mixins: [ Modal, ScrollPage ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 列表滚动高度
				listScrollH: 0,
				// 无内容
				noList: true,
				// 资讯列表
				newsList: [],
				// 分组信息
				group:{
					id: 0,
					name: ''
				}
			}
		},
		// 离开路由前导航钩子
        beforeRouteLeave (to, from, next) {
			// alert('书签下一个路由：'+to.name);
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
				let title = GetUrlQuery('name');
				this.group.id = GetUrlQuery('id');

				// 设置标题
				if(title) this.group.name = title;
				else this.group.name = '书签列表';
			},
			// 获取书签数据
			getListData(){
				// 加载页面
				this.pageLoading = true;

				Api.GetArticles(this.group.id)
				.then(res => {
					this.pageLoading = false;
					if(res.code == 200){						
						// 调整数据内容
						this.newsList = res.data.map((item, index)=>{
							return {
								id: item.id,
								title: item.title,
								keyWords: item.keyWords,
								time: item.strCollectTime,
								url: item.url
							}
						})

						if(this.newsList.length > 0) this.noList = false;

						var _this = this;
						this.$nextTick(() => {
							this.listNum = this.newsList.length;	
						})

						// 获取到缓存滚动高度
						if(this.listScrollH > 0){
							this.$nextTick(() => {
								scrollTo(0, _this.listScrollH);	
							})
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

				if(scrollTop > windowH/2){
					this.showTopBtn = true;
				}
				else{
					this.showTopBtn = false;
				}
			},
			// 跳转到新增/编辑页
			toStore(){
				Common.GotoPage('CollectStore', { id: this.group.id, type: 'edit', name: this.group.name }, this);
			},
			// 跳转到管理页
			toManage(){
				if(this.newsList.length <= 0){
					this.showWarnModel('暂无收藏文章可管理', 'warning');
					return false;
				}
				Common.GotoPage('BookmarkManage', { id: this.group.id, name: this.group.name }, this);
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
	@import "../../../assets/less/operate_bar";

	/* table_title */

	.table_title{
		height: 36*@rem;
		line-height: 36*@rem;
		position: fixed;
		top: @navbar_h;
		width: 100%;
		background: #fff;
		border-bottom: 1px solid @base_color;
		color: @base_color;

		.title, .time{
			.ft(12);
			display: block;
			text-align: center;
		}

		.title{
			width: 76%;
		}

		.time{
			.wd(70);
		}

		&:after{
			.clr;
		}
	}

	.table_list_cont{
		margin-top: @navbar_h + 36*@rem;
	}

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

	/* layout */
	@media screen and (min-width: 960px) {
		.operate_bar, .table_title {
			width: @wrapper_max_w;
		}
	}
</style>
