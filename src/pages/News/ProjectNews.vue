<template>
	<div id="projectNews">
		<ul class="news_list">
			<li v-for="(item, index) in newsList" :key="index" class="news_list_item cont_frame">
				<router-link :to="{ name: 'NewsDetail' }"><div class="list_item_cont fl">
					<div class="list_title">{{ item.title }}</div>
					<div class="list_tags">
						<span v-for="(tag, i) in item.tags" :key="i" class="tag fl">{{ tag }}</span>
						<span class="list_item_time fr">{{ item.time }}</span>	
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
					}
				]
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	/* news_list */
	
	.news_list_item{
		width: 100%;
		cursor: pointer;

		&:after, &:before {
			clear: both;
			content: '.';
			display: block;
			overflow: hidden;
			visibility: hidden;
			font-size: 0;
			line-height: 0;
			width: 0;
			height: 0;
		}

		&:last-child{
			margin-bottom: 0;
		}
	}


	.list_item_cont{
		width: 100%;
	}

	.list_title{
		margin-bottom: 5*@rem;
		height: 24*@rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list_tags{
		.tag{
			font-size: 12*@rem;
			color: @ft_gray_color;
			padding: 2*@rem 8*@rem;
			border: @border_deep;
			margin-right: 5*@rem;

			.border_radius(30)
		}
	}

	.list_item_time{
		font-size: 12*@rem;
		margin-top: 5*@rem;
		color: @ft_gray_color;
	}
</style>
