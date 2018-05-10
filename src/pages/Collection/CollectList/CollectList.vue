<template>
	<div id="collection">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 分组列表 -->
			<ul class="collect_group_list">
				<li v-for="(item, index) in collectList" :key="index" class="cont_frame collect_list_item" @click="toBookmark(item)">
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
	import Common from 'common/common.js'
	import { GetCookie } from 'common/important.js';

	export default {
		name: "collection",
		components: { Loading },
		data(){
			return{
				// 是否加载
				pageLoading: false,
				collectList:[
					{
						id: 1,
						name: '分组一'
					},
					{
						id: 2,
						name: '分组二'
					},
					{
						id: 3,
						name: '分组三'
					},
					{
						id: 4,
						name: '分组四'
					},
					{
						id: 5,
						name: '分组五'
					}
				]
			}
		},
		created(){
			this.init();
		},
		methods:{
			// 初始化
			init(){
                this.$store.commit('SET_NAV_TITLE', '收藏夹');
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
