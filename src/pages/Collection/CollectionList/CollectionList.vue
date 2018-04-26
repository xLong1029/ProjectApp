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
					<li class="operate_item" @click="toEdit">
						<i class="operate_icon icon_edit_line"></i>
						<span class="operate_title">编辑分组</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	// 通用JS
	import Common from 'common/common.js'
	import { GetCookie } from 'common/important.js';

	export default {
		name: "collection",
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
                this.$store.commit('SET_NAV_TITLE', '收藏夹');
			},
			// 跳转到书签页
			toBookmark(item){
				Common.GotoPage('BookmarkList', { id: item.id, name: item.name }, this);
			},
			// 跳转到新增/编辑页
			toStore(){
				Common.GotoPage('CollectStore', {}, this);
			},
			// 跳转到管理页
			toEdit(){
				Common.GotoPage('CollectManage', {}, this);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../../assets/less/setting";

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

	/* operate_bar */

	.operate_bar {
		height: @tabbar_h;
		background: #fff;
		bottom: 0;
		border-top: @border_deep;
		font-size: 12*@rem;
		width: 100%;
		position: fixed;
		z-index: 50;

		a, i, span {
			display: block;
		}
	}

	.operate_item {
		float: left;
		text-align: center;
		width: 50%;
		height: 86*@half_rem;
		color: @ft_gray_color;
		cursor: pointer;
		position: relative;

		&:hover{
			color: @base_color;
		}
	}

	.operate_icon {
		margin: 0 auto;
		text-align: center;
		.mt(4);
		.ft(18);
	}

	.operate_title {
		text-align: center;
		margin-top: 1*@rem;
	}

	/* layout */
	@media screen and (min-width: 960px) {
		.operate_bar {
			width: @wrapper_max_w;
		}
	}
</style>
