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
		name: "succCases",
		components: { Loading, Copyright, BackTop },
		mixins: [ scrollPage ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 案例列表
				caseList: [],
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
							this.loadMoreNow = false;
							// 停止加载更多
							this.loadMore = false;
						}
					}
					else alert(res.msg);
				})
				.catch(err => console.log(err))
			}
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
</style>
