<template>
	<div id="search">
		<!-- 搜索框 -->
		<header id="searchBar">
			<div class="search_bar">
				<!-- 返回按钮 -->
				<a class="btn slide_right fl" @click="goBack">
					<i class="icon_back"></i>
				</a>
				<!-- 输入框 -->
				<div class="search_box fl">
					<form action="/Search" target="blankFrame" @submit="getListData(listNum, false)">
						<iframe id="rfFrame" name="blankFrame" src="about:blank" style="display:none;"></iframe> 
						<input class="search_input" id="keyword" type="search" v-model="keyword" placeholder="请输入搜索关键词"/>
					</form>
				</div>
			</div>
		</header>
		<!-- 搜索 -->
		<div class="content">			
			<Loading v-if="sLoading"></Loading>
			<section v-else class="search_result">				
				<p v-if="getResult" class="res_title edge_frame">搜索结果：
					<span v-if="noResult" class="no_result">无信息</span>
				</p>
				<NewsList v-if="!noResult" :data="resList" :num="listNum" :save-scorll-h="false"></NewsList>
				<!-- 加载更多 -->
				<div v-if="loadMore" class="load_more">
					<Loading></Loading>
				</div>
			</section>
		</div>
		<!-- 版权信息 -->
		<Copyright></Copyright>
		<!-- 返回顶部 -->
		<BackTop v-show="showTopBtn" :hasTabBar="false"></BackTop>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import NewsList from "components/News/NewsList.vue";
	import Copyright from "components/Common/Copyright.vue";
	import BackTop from "components/Common/BackTop.vue";
	// Api方法
	import Api from "api/news.js";
	// 通用js
	import Common from 'common/common.js'
	// 混合
	import ScrollPage from 'mixins/scrollPage.js'
	import Modal from "mixins/modal.js"

	export default {
		name: "search",
		components: { NewsList, Copyright, BackTop, Loading },
		mixins: [ ScrollPage, Modal ],
		data(){
			return{
				// 搜索关键词
				keyword: '',
				// 搜索加载
				sLoading: false,
				// 是否有搜索结果
				getResult: false,
				// 无搜索结果
				noResult: false,
				// 搜索结果列表
				resList: [],
				// 是否开始搜索
				searchBegin: false,
				// 资讯数量
				listNum: 30
			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '信息搜索');
		},
		mounted(){
			// 监听滚动事件
			window.addEventListener('scroll', this.scrollPage);
		},
		methods:{
			// 获取列表内容, num: 获取个数，more:是否加载更多
			getListData(num, more){
				// 开始搜索
				this.searchBegin = true;
				
				if(this.keyword == ''){
					this.showWarnModel('请输入关键字!', 'warning');
					return false;
				}

				// 加载页面
				if(more) this.loadMore = true;
				else this.sLoading = true;

				Api.DeclareList({
					keyword: this.keyword,
					pageNum: 1,
					pageSize: num
				})
				.then(res => {
					if(res.code == 200){
						// 调整数据内容
						this.resList = res.data.result;

						this.getResult = true;
						this.noResult = false;

						// 停止页面加载
						this.sLoading = false;
												
						if(more){
							// 再无数据可添加
							if(this.listNum >= res.data.dataCount) this.loadMoreNow = true;
							else this.loadMoreNow = false;
							// 停止加载更多
							this.loadMore = false;
						}
					}
					else{
						this.getResult = true;
						this.noResult = true;
						this.sLoading = false;
						this.loadMore = false;
						this.showWarnModel(res.msg, 'warning');
					}
				})
				.catch(err => {
					this.getResult = true;
					this.noResult = true;
					this.sLoading = false;
					this.loadMore = false;
					console.log(err);
				})

				// 禁止表单自动提交跳转页面
				return false;
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
						// 如果不是开始搜索就返回，因为如果滚动页面触发了获取更多内容会弹出提示框“请输入关键字”，用户体验不好
						if(!this.searchBegin) return false;
						else{
							// 获取更多内容
							this.getListData(this.listNum, true);
						}
						
					}
				}
				if(scrollTop > windowH/2){
					this.showTopBtn = true;
				}
				else{
					this.showTopBtn = false;
				}
			},
			// 返回上一页
			goBack(){
				this.$router.go(-1);
			}
		},
		destroyed(){
			// 移除滚动事件
			window.removeEventListener("scroll",this.scrollPage);
		}
	};
</script>

<style lang="less">
	// 引入通用设置文件
	@import "../../assets/less/setting";

	/* search_bar */

	.search_bar {
	    width: 100%;
	    position: fixed;
	    z-index: 66;
	    height: @navbar_h;
	    background: @base_color;
	    top: 0;

	    .btn {
	        width: 15%;
	        height: @navbar_h;
	        text-align: center;
	        cursor: pointer;
	    }

	    i {
	        display: inline-block;
	        color: #fff;
	        font-size: 18*@rem;
	        margin-top: 10*@rem;
	    }
	}
	
	.search_box{
		position: relative;
		width: 80%;
	}

	input[type="search"]{
		border-radius: 0;
		outline: none;
		border: none;
		border-bottom: 1px solid lighten(@base_color, 30%);
		background-color: @base_color;
		color: #fff;

		line-height: 32*@rem;

		.ht(30);
		.mt(5);
	}

	input[type="search"]:focus{
		border-radius: 0;
		outline: none;
		border: none;
		background-color: @base_color;
		line-height: 32*@rem;
		color: #333;
	}

	// 移除搜索框的叉叉图标
	// input[type="search"]::-webkit-search-cancel-button {
	//     display: none;
	// }

	// 修改搜索框占位符字体颜色
	/* WebKit browsers */
	input[type="search"]::-webkit-input-placeholder{
		color: lighten(@base_color, 30%);
	}
	/* Mozilla Firefox 19+ */  
	input[type="search"]:-moz-placeholder{
		color: lighten(@base_color, 30%);
	}
	/* Mozilla Firefox 19+ */  
	input[type="search"]::-moz-placeholder{
		color: lighten(@base_color, 30%);
	}
	/* Internet Explorer 10+ */ 
	input[type="search"]:-ms-input-placeholder{
		color: lighten(@base_color, 30%);
	}

	.search_result{
		background: #fff;

		.mb(10);

		.res_title{
			color: @base_color;
			padding: 10*@rem;
			border-bottom: @border_light; 

			.mb(0);
		}

		.news_li_item:last-child{
			border-bottom: 0;
		}
	}

	.no_result{
		text-align: center;
		color: @ft_gray_color;
	}

	.search_btn{
		cursor: pointer;
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

	.back_top{
		bottom: 20*@rem;
	}

	/* layout */

	@media screen and (min-width: 960px) {
	    .search_bar {
	        width: @wrapper_max_w;
	    }
	}
</style>
