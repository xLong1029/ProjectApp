<template>
	<div id="succCases">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<ul class="case_list">
				<li v-for="(item, index) in caseList" :key="index" class="case_li_item fl">
					<a>
						<p class="case_name">
							<i class="case_icon icon-case"></i>
							<span class="case_title">项目名称: </span>{{ item.caseName }}
						</p>
						<p class="case_company">
							<i class="case_icon icon-company"></i>
							<span class="case_title">立项单位: </span>{{ item.companyName }}
						</p>
						<span class="case_type tag">{{ item.caseType }}</span>					
					</a>	
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

	export default {
		name: "succCases",
		components: { Loading, Copyright, BackTop },
		mixins: [ ScrollPage, Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 案例列表
				caseList: [],
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
			init(){
				this.getListData(this.listNum, false);
			},
			// 获取列表内容, num: 获取个数，more:是否加载更多
			getListData(num, more){
				// 加载页面
				if(!more) this.pageLoading = true;
				else this.loadMore = true;

				Api.CaseList({
					pageNum: 1,
					pageSize: num
				})
				.then(res => {
					if(res.code == 200){
						this.caseList = res.data.result;

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

	.case_list{
		background:  #fff;

		&:after, &:before {
			.clr;
		}
	}

	.case_li_item{
		width: 100%;
		padding: 10*@rem @edge_w;
		border-bottom: @border_light;

		.pb(10);

		&:hover{
			background: #f8f8f8;
		}

		.case_logo{
			display: block;
			text-align: center;
			border: @border_light;
			
			.wd(80);
			.ht(50);
			.ellipsis;
		}
		
		.case_name{
			.mb(8);
		}

		.case_icon, .case_title{
			color: @base_color;
			.mr(5);
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
