<template>
	<div id="userCenter">
		<div v-if="isLogined">
			<!-- 加载数据 -->
			<Loading v-if="pageLoading"></Loading>
			<!-- 加载结束 -->
			<div v-else>
				<!-- 修改密码表单 -->
				<form class="cont_frame">
					修改密码
				</form>
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
	// 通用JS
	import { GetCookie } from 'common/important.js';
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
                this.$store.commit('SET_NAV_TITLE', '修改密码');
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

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
</style>
