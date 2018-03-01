<template>
	<div id="index">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<div v-else>
			<!-- 消息通知 -->
			<section class="notice_part cont_frame">
				<span class="notice_icon fl"><i class="icon-horn"></i>通知：</span>
				<div class="notice_list">
					<ul class="scroll_list">
						<li v-for="(item, index) in report" :key="index" class="fl">{{ item }}</li>
					</ul>
				</div>
			</section>
			<!-- 最新资讯 -->
			<section class="news_part">
				<SectionTitle title="最新资讯" :read-more="true" route-name="ProjectNews"></SectionTitle>
				<NewsList :data="declareData"></NewsList>
			</section>
			<!-- 成功案例 -->
			<section class="case_part">
				<SectionTitle title="成功案例" :read-more="true" route-name="SuccCases"></SectionTitle>
				<div>
					<ul class="case_list cont_frame">
						<li v-for="(item, index) in caseDate" :key="index" class="case_li_item fl">
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
						<li v-for="(item, index) in partner" :key="index" class="cooper_li_item fl">
							<a class="cooper_logo" :href="item.url">
								<img :src="item.logo" alt="" @error="setDefaultPic"/>
							</a>
						</li>
					</ul>
				</div>
			</section>
			<!-- 版权信息 -->
			<Copyright></Copyright>
		</div>
	</div>
</template>

<script>
	// 引入组件
	import Loading from "components/Common/Loading.vue";
	import SectionTitle from "components/Common/SectionTitle.vue";
	import NewsList from "components/News/NewsList.vue";
	import Copyright from "components/Common/Copyright.vue";
	// Api方法
	import Api from "api/api.js";

	// 定时器
	var noticeScroll;

	export default {
		name: "index",
		components: { Loading, SectionTitle, NewsList, Copyright },
		data() {
			return {
				// 是否加载
				pageLoading: false,
				// 最新资讯
				declareData: [],
				// 消息通知
				report:[],
				// 成功案例
				caseDate: [],
				// 合作伙伴
				partner: []
			}
		},
		created(){
			this.getIndexCont();
		},
		methods:{
			// 获取首页内容
			getIndexCont(){
				// 开始加载
				this.pageLoading = true;

				Api.Index({
					declareNum: 5,
					caseNum: 6
				})
				.then(res => {
					if(res.code == 200){
						this.report = res.data.report;
						this.report = this.report.concat(this.report);

						this.declareData = res.data.declareData;
						this.caseDate = res.data.caseData;
						this.partner = res.data.partner;

						// 停止加载
						this.pageLoading = false;

						// 更新结束后再轮播
						var _this = this;
						this.$nextTick(() => {
							_this.noticeMove();
						})
					}
					else{
						this.$store.commit('SET_WARN_MODAL', { show: true, text: res.msg });
					}
				})
				.catch(err => console.log(err))
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
			},
			// 设置默认图片
			setDefaultPic(event) {
				// event.currentTarget 当前DOM对象
				event.currentTarget.src = require('@/assets/images/default.png');
				//控制不要一直跳动
				event.currentTarget.onerror = null;
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
				max-height: 80*@rem;
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
			border: @border_light;
			
			.ft(12);
			.mb(10);

			&:nth-child(4n){
				.mr(0);
			}			
		}

		.cooper_logo{
			display: table-cell;
			text-align: center;
			vertical-align: middle;
			height: 50*@rem;

			img{
				vertical-align: middle;
				display: inline-block;
				max-height: 100%;
				max-width: 100%;
			}
		}
	}

	@media screen and (min-width: 414px) {
		.notice_list{
			width: 83%;
		}
	}
</style>
