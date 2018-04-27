<template>
	<div id="userCenter">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 账号信息 -->
			<div class="cont_frame user_info_list">
				欢迎你，{{ userAccount }}
			</div>
			<ul>
				<li class="cont_frame user_info_list" @click="gotoChangePwd">
					<i class="list_icon icon_password"></i>修改密码<i class="icon-next"></i>
				</li>
				<li class="cont_frame user_info_list" @click="logOut">
					<i class="list_icon icon_exit"></i>退出登录<i class="icon-next"></i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	// 通用js
	import Common from 'common/common.js';
	import { GetCookie } from 'common/important.js';
	import { clearAccount } from 'common/account.js';
	// Api方法
	import Api from "api/user_center.js";
	//Vuex
	import { mapGetters } from 'vuex';

	export default {
		name: "userCenter",
		components: { Loading },
		computed: {
            ...mapGetters([ 'userAccount' ]),
        },
		data(){
			return{
				// 是否已登录
				isLogined: false,
				// 是否加载
				pageLoading: false
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
			init(){
                this.$store.commit('SET_NAV_TITLE', '个人中心');
			},
			// 跳转修改密码
			gotoChangePwd(){
				Common.GotoPage('ChangePassword', {}, this);
			},
			// 退出登录
			logOut(){
				clearAccount(this.$store.commit);
				Common.GotoPage('UnLogined', {}, this);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	/* user_info_list */

	.user_info_list{
		cursor: pointer;

		.list_icon{			
			color: @ic_gray_color;

			.mr(5);
		}

		.icon-next{
			color: #ddd;
			float: right;

			.mt(5);
			.ft(12);
		}
	}
</style>
