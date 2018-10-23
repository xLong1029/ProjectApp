<template>
	<div id="msgCenter">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<ul class="msg_list">
				<li v-for="(item, index) in declareList" :key="index" class="msg_ist_item cont_frame">
					<div class="title">{{ item.webSite }}</div>
					<NewsList :data="item.data" :num="item.data.length" :page-type="2"></NewsList>
				</li>
			</ul>
			<!-- 操作栏 -->
			<div id="operateBar">
				<ul class="operate_bar">
					<li class="operate_item">
						<i class="operate_icon icon_readed" @click="readAll"></i>
						<span class="operate_title">全部已读</span>
					</li>
				</ul>
			</div>
			<!-- 返回顶部 -->
			<BackTop v-show="showTopBtn"></BackTop>
		</div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import NewsList from "components/Message/NewsList.vue";
	import BackTop from "components/Common/BackTop.vue";
	// 通用js
	import Common from 'common/common.js';
	// 混合
	import Modal from "mixins/modal.js";
	import ScrollPage from 'mixins/scrollPage.js';
	// Api方法
	import Api from "api/message.js";

	export default {
		name: "msgCenter",
		components: { Loading, NewsList, BackTop },
		mixins: [ ScrollPage, Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 消息列表
				declareList: []
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
				this.$store.commit('SET_NAV_TITLE', '今日资讯');
				this.getMsg();
			},
			// 获取未读消息
			getMsg(){
				this.pageLoading = true;
				Api.GetMessage()
				.then(res => {
					this.pageLoading = false;
					if(res.code == 200){
						this.declareList = res.data.declareList;
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 全部已读
			readAll(){
				
			},
			// 页面滚动
			scrollPage(){				
				let	scrollTop = $(window).scrollTop(),
					windowH = $(window).height(),
					documentH = $(document).height();

				if(scrollTop > windowH/2){
					this.showTopBtn = true;
				}
				else{
					this.showTopBtn = false;
				}
			},
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
	@import "../../assets/less/operate_bar";

	.msg_ist_item{
		.title{
			color: @base_color;
			font-weight: bold;

			.ft(16);
		}
	}

	.operate_item{
		width: 100%;
	}
</style>
