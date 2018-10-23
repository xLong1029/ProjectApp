<template>
	<div id="msgCenter">
		<!-- 导航栏 -->
		<NavBar title="今日资讯" :show-search="true"></NavBar>
		<!-- 页面内容 -->
		<div class="content">
			<div :class="['hint', showHint ? 'show_hint': '']" class="hint">当前列表只显示未读过的消息</div>
			<!-- 加载数据 -->
			<Loading v-if="pageLoading"></Loading>
			<!-- 加载结束 -->
			<div v-else>
				<div v-if="!noList">
					<ul class="msg_list">
						<li v-for="(item, index) in declareList" :key="index" class="msg_ist_item cont_frame">
							<div class="title">{{ item.webSite }}</div>
							<NewsList :data="item.data" :num="item.data.length" :page-type="2"></NewsList>
						</li>
					</ul>
				</div>
				<div v-else class="no_msg_list">
					<p>今日暂无推送</p>
				</div>
				<!-- 操作栏 -->
				<div id="operateBar">
					<ul class="operate_bar">
						<li class="operate_item">
							<i class="operate_icon icon_readed" @click="showModel"></i>
							<span class="operate_title">标记全部已读</span>
						</li>
					</ul>
				</div>
				<!-- 返回顶部 -->
				<BackTop v-show="showTopBtn"></BackTop>
			</div>
			<!-- 全部已读提示 -->
            <PopModel :show="showComfir" @close="hideModel">
                <div slot="content">确认标记为全部已读吗？</div>
                <div slot="footer">				
                    <button class="button fr" style="width: 48%;" @click="readAll">确定</button>
                    <button class="button cancel_btn fl" style="width: 48%;" @click="hideModel(false)">取消</button>
                </div>
            </PopModel>
		</div>
	</div>
</template>

<script>
	// 组件
	import NavBar from "components/Common/NavBar.vue";
	import Loading from "components/Common/Loading.vue";
	import NewsList from "components/Message/NewsList.vue";
	import BackTop from "components/Common/BackTop.vue";
	import PopModel from "components/Modal/PopModal.vue";
	// 通用js
	import Common from 'common/common.js';
	// 混合
	import Modal from "mixins/modal.js";
	import ScrollPage from 'mixins/scrollPage.js';
	// Api方法
	import Api from "api/message.js";

	export default {
		name: "msgCenter",
		components: { NavBar, Loading, NewsList, BackTop, PopModel },
		mixins: [ ScrollPage, Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 是否显示提示
				showHint: true,
				// 无内容
				noList: true,
				// 是否显示提示弹窗
                showComfir: false,
				// 消息列表
				declareList: [],
				// 资讯ID列表
				idsList:[]
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
				setTimeout(() => { 
					this.showHint = false;
				}, 1000);
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

						if(this.declareList.length > 0) this.noList = false;

						for(let i = 0; i < this.declareList.length; i++){
							let data = this.declareList[i].data;
							for(let j = 0; j < data.length; j++){
								this.idsList.push(data[j].id);
							}
						}
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 显示提示弹窗
			showModel(){
				this.showComfir = true;
			},
			// 关闭提示弹窗
			hideModel(value){
				this.showComfir = value;
            },
			// 全部已读
			readAll(){
				this.hideModel(false);

				Api.Readed(this.idsList)
				.then(res => {
					this.pageLoading = false;
					if(res.code == 200){
						this.declareList = [];
						// 清空消息条数
						this.$store.commit('SET_UN_READ_COUNT', 0);
						this.showWarnModel('消息已全部标记成已读！', 'success');
						this.noList = true;
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
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
			}
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

	/* hint */

	.hint{
		position:absolute;
		top: -30*@rem;
		background: rgba(0, 0, 0, 0.65);
		color: #fff;
		line-height: 30*@rem;
		text-align: center;
		-webkit-transition: all 0.3s ease;
		-moz-transition: all 0.3s ease;
		transition: all 0.3s ease;
		width: 100%;
		
		.ht(30);
		.ft(12);
	}

	.show_hint{
		display: block;
		top: 0;
	}

	/* msg_list */

	.msg_ist_item{
		.title{
			color: @base_color;
			font-weight: bold;

			.ft(16);
		}
	}

	/* no_msg_list */

	.no_msg_list{
		background: #fff;
		padding: 100*@rem 0;

		p{
			text-align: center;
		}
	}

	.operate_item{
		width: 100%;
	}
</style>
