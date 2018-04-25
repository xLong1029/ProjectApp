<template>
	<div id="userCenter">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 修改密码表单 -->
			<form class="cont_frame">
				<div class="form_line">
					<input type="text" v-model="form.oldPassword" placeholder="旧密码"/>
				</div>
				<div class="form_line">
					<input type="password" v-model="form.newPassword" placeholder="新密码"/>
				</div>
				<div class="form_line">
					<input type="password" v-model="form.comfirmPassword" placeholder="确认密码"/>
				</div>
				<div class="form_line">
					<input type="button" class="button" value="确认修改" @click="validForm"/>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	// 通用JS
	import { GetCookie } from 'common/important.js';
	// Api方法
	import Api from "api/user_center.js";
	//Vuex
	import { mapGetters } from 'vuex';
	// 混合
	import Modal from "mixins/modal.js"

	export default {
		name: "userCenter",
		mixins: [ Modal ],
		components: { Loading },
		computed: {
            ...mapGetters([ 'userAccount' ]),
        },
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 表单信息
				form:{
					// 旧密码
					oldPassword: '',
					// 新密码
					newPassword: '',
					// 确认密码
					comfirmPassword: ''
				}
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
                this.$store.commit('SET_NAV_TITLE', '修改密码');
			},
			// 验证表单
			validForm(){
				if(this.form.oldPassword == ''){
					this.showWarnModel('请输入旧密码', 'warning');
					return false;
				}
				else if(this.form.newPassword == ''){
					this.showWarnModel('请输入新密码', 'warning');
					return false;
				}
				else if(this.form.newPassword == ''){
					this.showWarnModel('请输入确认密码', 'warning');
					return false;
				}
				else if(this.form.newPassword != this.form.comfirmPassword){
					this.showWarnModel('新密码2次数输入不一致', 'error');
					return false;
				}
				else{
					this.onSubmit();
				}
			},
			// 提交表单
			onSubmit(){
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";
</style>
