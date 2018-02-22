<template>
	<div id="index">
		<!-- 消息通知 -->
		<section class="notice_part cont_frame">
			<span class="notice_icon fl"><i class="icon-horn"></i>通知：</span>
			<div class="notice_list">
				<ul class="scroll_list">
					<li v-for="(item, index) in noticeList" :key="index" class="fl">{{ item }}</li>
				</ul>
			</div>
		</section>
		<!-- 最新资讯 -->
		<section class="news_part">
			<SectionTitle title="最新资讯" :read-more="true" route-name="ProjectNews"></SectionTitle>
			<NewsList :data="newsList"></NewsList>
		</section>
		<!-- 成功案例 -->
		<section class="case_part">
			<SectionTitle title="成功案例" :read-more="true" route-name="SuccCases"></SectionTitle>
			<div>
				<ul class="case_list cont_frame">
					<li v-for="(item, index) in caseList" :key="index" class="case_li_item fl">
						<a :href="item.url">
							<img class="case_logo" :src="item.logo" alt=""/>
							<span class="case_title">{{ item.companyName }}</span>
						</a>
					</li>
				</ul>
			</div>
		</section>
		<!-- 合作伙伴 -->
		<section class="cooper_part">
			<SectionTitle title="合作伙伴" :read-more="true"></SectionTitle>
			<div>
				<ul class="cooper_list cont_frame">
					<li v-for="(item, index) in cooperList" :key="index" class="cooper_li_item fl">
						<a :href="item.url">
							<img class="cooper_logo" :src="item.logo" alt=""/>
						</a>
					</li>
				</ul>
			</div>
		</section>
		<!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
	import $ from "jquery";
	// 引入组件
	import SectionTitle from "components/Common/SectionTitle.vue";
	import NewsList from "components/News/NewsList.vue";
	import Copyright from "components/Common/Copyright.vue";

	// 定时器
	var noticeScroll;

	export default {
		name: "index",
		components: { SectionTitle, NewsList, Copyright },
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
				caseList: [
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '华蓝集团',
						url: null
					}
				],
				cooperList: [
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						url: null
					}
				],
				noticeTxt: '',
			}
		},
		created(){
			this.noticeList = this.noticeList.concat(this.noticeList);
		},
		mounted(){
			this.noticeMove();
		},
		methods:{
			// 设置通知内容
			setNoticeTxt(){
				if(this.noticeList.length > 0){
					for(let i = 0; i < this.noticeList.length; i++){
						this.noticeTxt += this.noticeList[i] + '  ';
					}
				}
			},
			// 通知移动
			noticeMove(){
				var num = 0, speed = 50, ulWidth = 0;

				// 累加所有li的宽度
				for(let i = 0; i < $(".scroll_list").find('li').length; i++){
					ulWidth += $(".scroll_list").find('li').eq(i).width();
				}

				$(".scroll_list").css({ 'width': ulWidth });

				// 清除定时器，解决二次返回该页面时胡乱滚动BUG
				clearInterval(noticeScroll);

				//设置滚动速度
				noticeScroll = setInterval(function(){
					//750是根据你给的尺寸，可变的
					if (num == -$(".scroll_list").width()/2) {
						num = 0;
					}
					num -= 1;
					$(".scroll_list").css({ left: num });
				}, speed);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	.notice_part{
		.notice_icon{
			color: @base_color;

			i{
				.mr(5);
			}
		}

		.notice_list{		
			width: 79%;
			position: relative;

			.ht(24);

			.ellipsis;		
		}

		.scroll_list {
			position:absolute;
			left:0px;
			top:0px;
		}
	}

	.news_part{
		.mb(10);
	}

	.case_list, .cooper_list{
		.pb(0);

		&:after, &:before {
			.clr;
		}
	}

	.case_part{
		.case_li_item{
			width: 32%;
			margin-right: 2%;
			
			.ft(12);
			.mb(10);

			&:nth-child(3n){
				.mr(0);
			}

			.case_logo{
				width: 100%;
				border: @border_light;
			}

			.case_title{
				display: block;
				text-align: center;
				width: 100%;

				.ellipsis;
			}
			
		}
	}

	.cooper_part{
		.cooper_li_item{
			width: 23%;
			margin-right: 2.6%;
			
			.ft(12);
			.mb(10);

			&:nth-child(4n){
				.mr(0);
			}			
		}

		.cooper_logo{
			border: @border_light;
		}
	}

	@media screen and (min-width: 414px) {
		.notice_list{
			width: 83%;
		}
	}
</style>
