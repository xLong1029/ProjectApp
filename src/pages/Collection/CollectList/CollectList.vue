<template>
	<div id="collection">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 分组列表 -->
			<ul class="collect_group_list">
				<li v-for="(item, index) in groupList" :key="index" class="cont_frame collect_list_item" @click="toBookmark(item)">
					<i class="list_icon icon_file"></i>{{ item.name }}<i class="icon_next"></i>
				</li>
			</ul>
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
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	// 通用JS
	import Common from 'common/common.js';
	import { GetCookie } from 'common/important.js';
	// Api方法
	import Api from "api/collection.js";

	export default {
		name: "collection",
		components: { Loading },
		data(){
			return{
				// 是否加载
				pageLoading: false,
				groupList:[]
			}
		},
		created(){
			this.init();
		},
		methods:{
			// 初始化
			init(){
				this.$store.commit('SET_NAV_TITLE', '收藏夹');
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
					}
					else this.showWarnModel(res.msg, 'warning');
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
				Common.GotoPage('CollectManage', {}, this);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../../assets/less/setting";
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

	/* layout */
	@media screen and (min-width: 960px) {
		.operate_bar {
			width: @wrapper_max_w;
		}
	}
</style>
