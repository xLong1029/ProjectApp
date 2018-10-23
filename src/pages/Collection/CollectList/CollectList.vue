<template>
	<div id="collection">
		<!-- 导航栏 -->
		<NavBar title="收藏夹" :show-msg="true"></NavBar>
		<!-- 页面内容 -->
		<div class="content">
			<!-- 加载数据 -->
			<Loading v-if="pageLoading"></Loading>
			<!-- 加载结束 -->
			<div v-else>
				<!-- 分组列表 -->
				<ul v-if="!noList"  class="collect_group_list">
					<li v-for="(item, index) in groupList" :key="index" class="cont_frame collect_list_item" @click="toBookmark(item)">
						<i class="list_icon icon_file"></i>{{ item.name }}<i class="icon_next"></i>
					</li>
				</ul>
				<div v-else class="no_collect_list">
					<p>暂无分组内容</p>
				</div>			
				<!-- 操作栏 -->
				<div id="operateBar">
					<ul class="operate_bar">
						<li class="operate_item">
							<i class="operate_icon icon_file_add_line" @click="toStore"></i>
							<span class="operate_title">添加分组</span>
						</li>
						<li class="operate_item" @click="toManage">
							<i class="operate_icon icon_file_setting_line"></i>
							<span class="operate_title">管理分组</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 组件
	import NavBar from "components/Common/NavBar.vue";
	import Loading from "components/Common/Loading.vue";
	// 通用JS
	import Common from 'common/common.js';
	import { GetLocalS } from 'common/important.js';
	// Api方法
	import Api from "api/collection.js";
	// 混合
	import Modal from "mixins/modal.js";

	export default {
		name: "collection",
		components: { NavBar, Loading },
		mixins: [ Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 无内容
				noList: true,
				// 分组列表
				groupList:[]
			}
		},
		created(){
			this.init();
		},
		methods:{
			// 初始化
			init(){
				this.getPageData();
			},
			// 获取分组数据
			getPageData(){
				this.pageLoading = true;
				Api.GetGroups()
				.then(res => {
					this.pageLoading = false;
					if(res.code == 200){
						this.groupList = res.data;
						if(this.groupList.length > 0) this.noList = false;
					}
					// else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 跳转到书签页
			toBookmark(item){
				Common.GotoPage('BookmarkList', { id: item.id, name: item.name }, this);
			},
			// 跳转到新增/编辑页
			toStore(){
				Common.GotoPage('CollectStore', { type: 'add' }, this);
			},
			// 跳转到管理页
			toManage(){
				if(this.groupList.length <= 0){
					this.showWarnModel('暂无分组可管理', 'warning');
					return false;
				}
				Common.GotoPage('CollectManage', {}, this);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../../assets/less/setting";
	@import "../../../assets/less/operate_bar";

	/* no_collect_list */

	.no_collect_list{
		background: #fff;
		padding: 100*@rem 0;

		p{
			text-align: center;
		}
	}

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

	/* layout */
	@media screen and (min-width: 960px) {
		.operate_bar {
			width: @wrapper_max_w;
		}
	}
</style>
