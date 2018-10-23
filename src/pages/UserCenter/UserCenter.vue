<template>
	<div id="userCenter">
		<!-- 导航栏 -->
		<NavBar title="个人中心" :show-title="false" :show-msg="true"></NavBar>
		<!-- 页面内容 -->
		<div class="content">
			<!-- 加载数据 -->
			<Loading v-if="pageLoading"></Loading>
			<!-- 加载结束 -->
			<div v-else>
				<!-- 账号信息 -->
				<div class="cont_frame">
					欢迎你，{{ userAccount.userName }}
				</div>
				<ul class="user_info_list">
					<li class="cont_frame user_info_list_item" @click="gotoChangePwd">
						<i class="list_icon icon_password"></i>修改密码<i class="icon_next"></i>
					</li>
					<li class="cont_frame user_info_list_item" @click="logOut">
						<i class="list_icon icon_exit"></i>退出登录<i class="icon_next"></i>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	// 组件
	import NavBar from "components/Common/NavBar.vue";
	import Loading from "components/Common/Loading.vue";
	// 通用js
	import Common from 'common/common.js';
	import { ClearAccount } from 'common/account.js';
	// Api方法
	import Api from "api/user_center.js";
	//Vuex
	import { mapGetters } from 'vuex';

	export default {
		name: "userCenter",
		components: { NavBar, Loading },
		computed: {
            ...mapGetters([ 'userAccount' ]),
        },
		data(){
			return{
				// 是否加载
				pageLoading: false
			}
		},
		methods:{
			// 跳转修改密码
			gotoChangePwd(){
				Common.GotoPage('ChangePassword', {}, this);
			},
			// 退出登录
			logOut(){
				ClearAccount(this.$store.commit);
				Common.GotoPage('UnLogined', {}, this);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	/* user_info_list */

	.user_info_list_item{
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
</style>
