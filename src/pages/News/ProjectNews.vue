<template>
	<div id="projectNews">
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
	</div>
</template>

<script>
	export default {
		name: "projectNews",
		data() {
			return{
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
</style>
