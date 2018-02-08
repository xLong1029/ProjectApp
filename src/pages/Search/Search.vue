<template>
	<div id="search" class="search_cont">
		<section class="cont_frame">
			<div class="search_input">
				<i class="icon-search"></i>
				<input type="text" v-model="keyword" placeholder="请输入搜索关键词"/>
			</div>
		</section>
		<section v-if="getResult" class="search_result">
			<p class="res_title edge_frame">搜索结果：<span v-if="noResult" class="no_result">搜索不到该信息</span></p>
			<NewsList :data="newsList"></NewsList>
		</section>
	</div>
</template>

<script>
	// 引入组件
	import NewsList from "components/News/NewsList.vue";

	export default {
		name: "search",
		components: { NewsList },
		data(){
			return{
				// 搜索关键词
				keyword: '',
				// 是否有搜索结果
				getResult: true,
				// 无搜索结果
				noResult: false,
				newsList: [
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						time: '2017/12/4'
					},
					{
						title: '这里是项目申报资讯信息，这里是项目申报资讯信息',
						time: '2017/12/4'
					}
				]
			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '信息搜索');
		}
	};
</script>

<style lang="less">
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
			top: 8*@rem;
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
</style>
