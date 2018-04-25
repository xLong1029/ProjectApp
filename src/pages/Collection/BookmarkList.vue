<template>
	<div id="collection">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 书签列表 -->
			<ul class="bookmark_list">
				<li v-for="(item, index) in collectList" :key="index" class="book_list_item" @click="gotoPage(item)">
					{{ item.name }}<i class="icon_next"></i>
				</li>
			</ul>
			<!-- 操作栏 -->
			<div id="operateBar">
				<ul class="operate_bar">
					<li class="operate_item">
						<i class="operate_icon icon_edit_line"></i>
						<span class="operate_title">更改组名</span>
					</li>
					<li class="operate_item">
						<i class="operate_icon icon_delete_line"></i>
						<span class="operate_title">删除文章</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	// 通用JS
	import Common from 'common/common.js'
	import { GetCookie, GetUrlQuery } from 'common/important.js';
	// Api方法
	import Api from "api/user_center.js";

	export default {
		name: "collection",
		data(){
			return{
				// 是否加载
				pageLoading: false,
				collectList:[
					{
						id: 1,
						name: '文章一',
						url: ''
					},
					{
						id: 2,
						name: '文章二',
						url: ''
					},
					{
						id: 3,
						name: '文章三',
						url: ''
					},
					{
						id: 4,
						name: '文章四',
						url: ''
					},
					{
						id: 5,
						name: '文章五',
						url: ''
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
				let title = GetUrlQuery('name');
				if(title) this.$store.commit('SET_NAV_TITLE', title);
                else this.$store.commit('SET_NAV_TITLE', '书签列表');
			},
			// 跳转页面
			gotoPage(item){
				Common.GotoPage('NewsDetail', { id: item.id, type: 2 }, this);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	/* bookmark_list */
	
	.book_list_item{
		background: #fff;
		padding: 10*@rem;
		border-bottom: @border_light;
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
		color: #666;
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
