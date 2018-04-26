<template>
	<div id="collection">
		<!-- 导航栏 -->
		<header id="navBar">
			<div class="navbar">		
				<!-- 取消按钮-->
				<a class="btn fl">
					<button class="button cancel_btn" @click="toCollectList">取消</button>
				</a>
				<!-- 标题 -->
				<div class="title fl">{{ navTitle }}</div>
				<!-- 全选按钮 -->
				<a class="btn fr">
					<button class="button select_btn" @click="validForm">保存</button>
				</a>
			</div>
		</header>
		<!-- 页面内容 -->
		<div class="content">
			<!-- 加载数据 -->
			<Loading v-if="pageLoading"></Loading>
			<!-- 加载结束 -->
			<div v-else class="cont_frame">
				<form>
					<div class="form_line">
						<input ref="groupName" type="text" v-model="form.name" placeholder="分组名称" @click="selectInput"/>
					</div>
				</form>
			</div>
		</div>
		<!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
	// 组件
	import Copyright from "components/Common/Copyright.vue";
	import Loading from "components/Common/Loading.vue";
	// 通用JS
	import Common from 'common/common.js'
	import { GetCookie, GetUrlQuery } from 'common/important.js';
	// 混合
	import Modal from "mixins/modal.js"

	export default {
		name: "collection",
		components: { Copyright, Loading },
		mixins: [ Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 导航标题
				navTitle: '新建分组',
				// 表单信息
				form:{
					// 分组名称
					name: '',
				},
			}
		},
		// 进入路由前导航钩子
        beforeRouteEnter (to, from, next) {
            if(GetCookie('project_token')) next();
			else next({ name : 'UnLogined' });
		},
		created(){
			this.init();
		},
		methods:{
			// 初始化
			init(){
				if(GetUrlQuery('type') == 'edit'){
					this.navTitle = '更改组名';
					// this.pageLoading = true;
					this.form.name = 'XXXXXXXXXXX分组';
				}
			},
			// 跳转到收藏夹
			toCollectList(){
				Common.GotoPage('CollectList', {}, this);
			},
			// 选中文本
			selectInput(e){
				e.target.select()
			},
			// 验证表单
			validForm(){
				if(this.form.name == ''){
					this.showWarnModel('请输入分组名称', 'warning');
					return false;
				}
				else if(this.form.name.length > 10){
					this.showWarnModel('分组名称字数不可大于10', 'warning');
					return false;
				}
				else{
					this.onSubmit();
				}
			},
			// 保存操作
			onSubmit(){
				Common.GotoPage('CollectList', {}, this);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../../assets/less/setting";
	@import "../../../assets/less/navbar";
	@import "../../../assets/less/operate_bar";

	/* collect_group_list */
	
	.collect_list_item{
		cursor: pointer;

		.list_icon{			
			color: @ic_gray_color;

			.mr(5);
		}

		.icon_next{
			color: #ddd;
			float: right;

			.mt(5);
			.ft(12);
		}
	}

	.operate_item {
		width: 100%;
	}

	.select_btn, .cancel_btn{
		border: @border_light;
		margin: 7*@rem auto;
		width: 80%;
		height: 25*@rem;
		line-height: 25*@rem;
		background: #fff;
		color: #666;

		.ft(12);
	}
</style>
