<template>
	<div id="userCenter">
		<div v-if="isLogined">
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
						<i class="list_icon icon-news"></i>修改密码<i class="icon-next"></i>
					</li>
					<li class="cont_frame user_info_list" @click="logOut">
						<i class="list_icon icon-exit"></i>退出登录<i class="icon-next"></i>
					</li>
				</ul>
			</div>
		</div>
		<div v-else class="no_login">
			<p>你还未登录</p>
			<router-link class="button login_btn" :to="{ name: 'Login' }">去登录</router-link>
		</div>
		<!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import Copyright from "components/Common/Copyright.vue";
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
		components: { Loading, Copyright },
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
		created(){
			this.init();
		},
		methods:{
			init(){
				if(GetCookie('project_token')){
					this.isLogined = true;
				}
                this.$store.commit('SET_NAV_TITLE', '个人中心');
			},
			// 跳转修改密码
			gotoChangePwd(){
				Common.GotoPage('ChangePassword', {}, this);
			},
			// 退出登录
			logOut(){
				this.isLogined = false;
				clearAccount(this.$store.commit);
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	/* no_login */
	
	.no_login{
		background: #fff;
		padding: 100*@rem 0;

		p{
			text-align: center;
		}
	}

	.login_btn{
		margin: auto;
		.wd(150);

		&:hover{
			color: #fff;
		}
	}

	/* user_info_list */

	.user_info_list{
		.list_icon{
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
