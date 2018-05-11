<template>
	<div id="collection">
		<!-- 导航栏 -->
		<Header>
			<button slot="left" class="button cancel_btn" @click="cancel">取消</button>
			<span slot="center">{{ navTitle }}</span>
			<button slot="right" class="button select_btn" @click="validForm">保存</button>
		</Header>
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
	import Header from "components/Common/Header.vue";
	// 通用JS
	import Common from 'common/common.js';
	import { GetCookie, GetUrlQuery } from 'common/important.js';
	// 混合
	import Modal from "mixins/modal.js";
	// Api方法
	import Api from "api/collection.js";

	export default {
		name: "collection",
		components: { Copyright, Loading, Header },
		mixins: [ Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 页面操作类型
				pageType: 'add',
				// 导航标题
				navTitle: '新建分组',
				// 表单信息
				form:{
					// 分组ID
					id: 0,
					// 分组名称
					name: '',
				},
			}
		},
		created(){
			this.init();
		},
		methods:{
			// 初始化
			init(){
				this.pageType = GetUrlQuery('type');
				if(this.pageType == 'edit'){
					this.navTitle = '更改组名';
					this.form.id = GetUrlQuery('id');
					this.form.name = GetUrlQuery('name');
				}
			},
			// 跳转到收藏夹
			cancel(){
				this.$router.go(-1);
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
				// 新增
				if(this.pageType == 'add'){
					Api.AddGroup(this.form.name)
					.then(res => {
						this.pageLoading = false;
						if(res.code == 200) Common.GotoPage('CollectList', {}, this);
						else this.showWarnModel(res.msg, 'warning');
					})
					.catch(err => console.log(err))
				}
				// 修改
				else if(this.pageType == 'edit'){
					Api.EditGroup(this.form)
					.then(res => {
						this.pageLoading = false;
						if(res.code == 200) Common.GotoPage('CollectList', {}, this);
						else this.showWarnModel(res.msg, 'warning');
					})
					.catch(err => console.log(err))
				}
				else this.showWarnModel('页面出错，请返回上一页重新操作', 'warning');
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
</style>
