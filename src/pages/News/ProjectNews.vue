<template>
	<div id="projectNews">
		<!-- 加载数据 -->
		<Loading v-if="loading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 资讯列表 -->
			<ul class="news_list">
				<li v-for="(item, index) in newsList" :key="index" class="news_li_item proj_news">
					<router-link :to="{ name: 'NewsDetail' }">
						<div class="news_li_cont fl">
							<h2 class="news_li_title">{{ item.title }}</h2>
							<div class="news_li_tags">
								<span v-for="(tag, i) in item.tags" :key="i" class="tag fl">{{ tag }}</span>
								<span class="news_li_time fr">{{ item.time }}</span>	
							</div>
						</div>
					</router-link>			
				</li>
			</ul>
			<div class="clearfix"></div>
			<div v-if="loadmore" class="load_more">
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

	export default {
		name: "projectNews",
		components: { Loading, Copyright, BackTop },
		data() {
			return{
				// 是否加载
				loading: false,
				// 是否加载更多
				loadmore: false,
				// 是否显示返回顶部按钮
				showTopBtn: false,
				// 资讯列表
				newsList: [
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2017/12/4'
					}
				]
			}
		},
		created(){
			var self = this;
			// 监听页面滚动事件
			$(window).scroll(function(){
				let scrollTop = $(this).scrollTop(),
					windowH = $(this).height(),
					documentH = $(document).height();
				if(scrollTop + windowH >= documentH - 40){
					self.loadData();
				}
				if(scrollTop >= windowH/2){
					self.showTopBtn = true;
					console.log(1);
				}
				else{
					self.showTopBtn = false;
				}
			})
		},
		methods:{
			// 加载数据
			loadData(){
				this.loadmore = true;
				var self = this;
				setTimeout(function(){
					self.newsList.push({
						title: '这里是新加载的内容',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2018/12/4'
					},
					{
						title: '这里是新加载的内容',
						tags: [ '申报', '通知', '项目资讯'],
						time: '2018/12/4'
					});

					self.loadmore = false;
				}, 1000)
			}

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

		.news_li_time{
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
