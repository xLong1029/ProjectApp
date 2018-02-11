<template>
	<div id="index">
		<section class="notice_part cont_frame">
			<span class="notice_icon fl"><i class="icon-horn"></i>通知：</span>
			<div id="scroll_list" class="notice_list" >
				<div id="scroll_begin">{{ noticeTxt }}</div>
				<div id="scroll_end"></div>
			</div>
		</section>
		<section class="news_part">
			<SectionTitle title="最新资讯" :read-more="true" route-name="ProjectNews"></SectionTitle>
			<NewsList :data="newsList"></NewsList>
		</section>
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
	</div>
</template>

<script>
	import $ from "jquery";
	// 引入组件
	import SectionTitle from "components/Common/SectionTitle.vue";
	import NewsList from "components/News/NewsList.vue";

	// 定时器
	var noticeScroll;

	export default {
		name: "index",
		components: { SectionTitle, NewsList },
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
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
						url: null
					}
				],
				cooperList: [
					{
						logo: require('assets/images/default.png'),
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						url: null
					}
				],
				noticeTxt: '',
			}
		},
		created(){
			this.setNoticeTxt();
		},
		mounted(){
			this.noticeMove();
		},
		methods:{
			// 设置通知内容
			setNoticeTxt(){
				if(this.noticeList.length > 0){
					for(let i = 0; i < this.noticeList.length; i++){
						this.noticeTxt += this.noticeList[i];
					}
				}
			},
			// 通知移动
			noticeMove(){
				var speed = 50;
				var scroll_begin = document.getElementById("scroll_begin");
				var scroll_end = document.getElementById("scroll_end");
				var scroll_list = document.getElementById("scroll_list");
				scroll_end.innerHTML = scroll_begin.innerHTML;
				noticeScroll = setInterval(function(){
					if (scroll_end.offsetWidth - scroll_list.scrollLeft <= 0)
						scroll_list.scrollLeft -= scroll_begin.offsetWidth;
					else
						scroll_list.scrollLeft++;
				}, speed);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	#gongao {
        width: 1000px;
        height: 30px;
        overflow: hidden;
        line-height: 30px;
        font-size: 13px;
        font-family: '宋体';
        background: #DDE5ED;
        color: #0C77CF;
        font-weight: bold;
    }

    #gongao #scroll_begin,
    #gongao #scroll_end {
        display: inline
    }

	.notice_part{
		.notice_icon{
			color: @base_color;

			i{
				.mr(5);
			}
		}

		.notice_list{		
			width: 79%;
			.ht(24);

			.ellipsis;		
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
			width: 24%;
			margin-right: 1.2%;
			
			.ft(12);
			.mb(10);

			&:nth-child(4n){
				.mr(0);
			}			
		}
	}

	@media screen and (min-width: 414px) {
		.notice_list{
			width: 83%;
		}
	}
</style>
