<template>
	<div id="search">
		<!-- 搜索 -->
		<div class="search_cont">
			<section class="cont_frame">
				<div class="search_input">
					<form action="/Search" target="blankFrame">
						<iframe id="rfFrame" name="blankFrame" src="about:blank" style="display:none;"></iframe> 
						<i class="icon-search search_btn" @click="getListData(listNum, false)"></i>
						<input id="keyword" type="search" v-model="keyword" placeholder="请输入搜索关键词" @keyup.enter="getListData(listNum, false)"/>
					</form>
				</div>
			</section>
			<Loading v-if="sLoading"></Loading>
			<section v-else class="search_result">				
				<p v-if="getResult" class="res_title edge_frame">搜索结果：
					<span v-if="noResult" class="no_result">无信息</span>
				</p>
				<NewsList v-if="!noResult" :data="resList" :num="listNum"></NewsList>
				<!-- 加载更多 -->
				<div v-if="loadMore" class="load_more">
					<Loading></Loading>
				</div>
			</section>
		</div>
		<!-- 版权信息 -->
		<Copyright></Copyright>
		<!-- 返回顶部 -->
		<BackTop v-show="showTopBtn" :second-page="true"></BackTop>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import NewsList from "components/News/NewsList.vue";
	import Copyright from "components/Common/Copyright.vue";
	import BackTop from "components/Common/BackTop.vue";
	// Api方法
	import Api from "api/api.js";
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
				resList: []
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
				if(this.keyword == ''){
					this.showWarnModel('请输入关键字', 'warning');
					return false;
				}
				console.log(more);

				// 加载页面
				if(more) this.loadMore = true;
				else this.sLoading = true;

				Api.Search({
					keyword: this.keyword,
					pageNum: 1,
					pageSize: num
				})
				.then(res => {
					if(res.code == 200){
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

	.search_cont{
		border-bottom: @border_light;
	}
	
	.search_input{
		position: relative;

		input{
			.pr(35);
			.mb(0);
		}

		.icon-search{
			position: absolute;
			top: 9*@rem;
			right: 10*@rem;
			color: @ft_gray_color;

			.ft(16);
		}
	}

	.search_result{
		background: #fff;

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
</style>
