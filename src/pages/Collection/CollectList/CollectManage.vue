<template>
	<div id="collection">
		<!-- 导航栏 -->
		<header class="navbar">	
			<!-- 取消按钮-->
			<a class="btn fl">
				<button class="button cancel_btn" @click="$router.go(-1)">取消</button>
			</a>
			<!-- 标题 -->
			<div class="title fl">分组管理</div>
			<!-- 全选按钮 -->
			<a class="btn fr">
				<input type="button" class="button select_btn" @click="selectAll" value="全选"/>
			</a>				
		</header>
		<!-- 页面内容 -->
		<div class="content">
			<!-- 加载数据 -->
			<Loading v-if="pageLoading"></Loading>
			<!-- 加载结束 -->
			<div v-else>
				<!-- 分组列表 -->
				<ul class="collect_group_list">
					<li v-for="(item, index) in collectList" :key="index" class="cont_frame collect_list_item">
						<span>{{ item.name }}</span>
						<!-- 选择 -->
						<span class="fr">
							<Checkbox ref="checkbox" :v-model="item.checked" :index="index" @change="getCheckBoxValue"></Checkbox>
						</span>
						<!-- 编辑 -->
						<i class="icon_edit fr" @click="toStore(item)"></i>
					</li>
				</ul>
			</div>
		</div>
		<!-- 操作栏 -->
		<div id="operateBar">
			<ul class="operate_bar">
				<li class="operate_item" @click="deleteGroup">
					<i class="operate_icon icon_delete_line"></i>
					<span class="operate_title">删除分组</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// 组件
	import Checkbox from "components/Form/Checkbox.vue";
	import Loading from "components/Common/Loading.vue";
	// 通用JS
	import Common from 'common/common.js';
	import { GetCookie } from 'common/important.js';
	// Api方法
	import Api from "api/collection.js";
	// 混合
	import Modal from "mixins/modal.js";

	export default {
		name: "collection",
		components: { Checkbox, Loading },
		mixins: [ Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				collectList:[
					{
						id: 1,
						name: '分组一',
						checked: false
					},
					{
						id: 2,
						name: '分组二',
						checked: false
					},
					{
						id: 3,
						name: '分组三',
						checked: false
					},
					{
						id: 4,
						name: '分组四',
						checked: false
					},
					{
						id: 5,
						name: '分组五',
						checked: false
					}
				],
				// 选值列表
				selectList:[]
			}
		},
		created(){
			this.getPageData();
		},
		methods:{
			// 获取分组数据
			getPageData(){
				this.pageLoading = true;
				Api.GetGroups()
				.then(res => {
					this.pageLoading = false;
					if(res.code == 200){
						this.collectList = res.data;
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 跳转到收藏夹
			toCollectList(){
				Common.GotoPage('CollectList', {}, this);
			},
			// 跳转到新增/编辑页
			toStore(item){
				Common.GotoPage('CollectStore', { id: item.id, type: 'edit', name: item.name }, this);
			},
			// 从子组件获取Checkbox值
            getCheckBoxValue(e){
                this.collectList[e[1]].checked = e[0];
			},
			// 全选
			selectAll(e){
				let value = true;
				if(e.target.value == '全选'){
					e.target.value = '全不选';
				}
				else{
					e.target.value = '全选';
					value = false;
				}

				for(let i = 0 ; i < this.collectList.length; i++){
					this.collectList[i].checked = value;
					this.$refs.checkbox[i].setChecked(value);
				}
			},
			// 删除分组
			deleteGroup(){
				for(let i = 0; i < this.collectList.length; i++){
					if(this.collectList[i].checked){
						this.selectList.push(this.collectList[i].id);
					}
				}
				console.log('选中的ids:', this.selectList);

				if(this.selectList.length <= 0){
					this.showWarnModel('请选择要删除的分组', 'warning');
					return false;
				}
				this.$router.go(-1);
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

	.icon_edit{
		display: block;
		color: #888;

		.ft(15);
		.mr(30);
		.mt(2);
	}
</style>
