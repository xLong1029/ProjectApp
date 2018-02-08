<template>
	<div id="index">
		<!-- 消息通知 -->
		<section class="notice_part cont_frame">
			<span class="notice_icon fl"><i class="icon-horn fl"></i>通知：</span>
			<!-- 消息轮播 -->
			<swiper :options="swiperOption" ref="mySwiper" class="notice_list">
				<swiper-slide v-for="(item, index) in noticeList" :key="index">        
					{{ item }}
				</swiper-slide>
			</swiper>
		</section>
		<!-- 申报咨询 -->
		<section class="news_part">
			<SectionTitle title="申报资讯" :read-more="true" route-name="ProjectNews"></SectionTitle>
			<NewsList :data="newsList"></NewsList>
		</section>
		<!-- 成功案例 -->
		<section class="case_part">
			<SectionTitle title="成功案例" :read-more="true" route-name="ProjectNews"></SectionTitle>
			<div class="cont_frame">内容</div>
		</section>
		<!-- 合作伙伴 -->
		<section class="cooper_part">
			<SectionTitle title="合作伙伴" :read-more="true" route-name="ProjectNews"></SectionTitle>
			<div class="cont_frame">内容</div>
		</section>
	</div>
</template>

<script>
	import $ from "jquery";
	// 引入组件
	import SectionTitle from "components/Common/SectionTitle.vue";
	import NewsList from "components/News/NewsList.vue";

	export default {
		name: "index",
		components: { SectionTitle, NewsList },
		computed: {
			swiper() {
				console.log(this.$refs.mySwiper.swiper);
				return this.$refs.mySwiper.swiper;  
			}  
		},
		data() {
			return {
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
				],
				noticeList:[
					'恭喜SOLO公司成功申请了牛逼轰轰的项目！！',
					'恭喜xLong成功申请了牛逼轰轰的项目！！',
					'恭喜Lio.Huang成功申请了牛逼轰轰的项目！！'
				],
				// vue-awesome-swiper 参数及使用方法请查看官方说明 https://surmon-china.github.io/vue-awesome-swiper
				swiperOption: {   
					slidesPerView: 'auto',
					spaceBetween: 0,
					speed: 1000,
					autoplay: true,
					loop: true,             
				}
			}
		},
		created(){
		},
		mounted(){
		},
		methods:{
		}
	};
</script>

<style lang="less">
	// 引入通用设置文件
	@import "../../assets/less/setting";

	.notice_part{
		// .swiper-slide{
		// 	width: auto;
		// }
	}

	.notice_icon{
		color: @base_color;

		i{
			.mt(2);
			.mr(5);
			.ft(16);
		}
	}

	.notice_list{
		overflow: hidden;
		.ht(24);

		.n_li_item {
		}
		
	}

	.news_part{
		.mb(10);
	}
</style>
