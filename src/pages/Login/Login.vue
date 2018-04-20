<template>
	<div id="login">		
		<section class="login edge_frame">
			<h1 class="login_title">登 录</h1>
			<form>
				<div class="form_line">
					<input type="text" v-model="form.username" placeholder="手机号码"/>
				</div>
				<div class="form_line">
					<input type="text" v-model="form.password" placeholder="密码"/>
				</div>
				<div class="form_line">
					<input type="checkbox" class="checkbox" name="agree" v-model="form.remember" />记住密码
				</div>
				<div class="form_line">
					<input type="button" class="button" value="登录" @click="validForm"/>
				</div>
				<div class="form_line">
					<router-link class="button reg_btn" :to="{ name: 'Register' }">注册新用户</router-link>
				</div>
			</form>
		</section>
		<!-- 版权信息 -->
		<section class="bottom">
			<Copyright></Copyright>
		</section>
	</div>
</template>

<script>
	// 组件
	import Copyright from "components/Common/Copyright.vue";
	// Api方法
	import Api from "api/login.js";

	export default {
		name: "login",
		components: { Copyright },
		data(){
			return{
				// 表单信息
				form:{
					// 用户名
					username: '',
					// 密码
					password: '',
					// 是否记住密码
					remember: false
				},
			}
		},
		created(){
		},
		methods:{
			// 验证表单
			validForm(){
				if(this.form.username == ''){
					this.showWarnModel('请输入手机号码', 'warning');
					return false;
				}
				else if(this.form.password == ''){
					this.showWarnModel('请输入密码', 'warning');
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

	.login{
		position: fixed;
		width: 100%;
		top: 50%;
		.mt(-200);
	}

	.login_title{
		text-align: center;
		color: @base_color;
		.mb(20);
	}

	.reg_btn{
		background: #ecaa1e;

		&:hover{
			color: #fff;
		}
	}

	.bottom{
		position: absolute;
		width: 100%;
		bottom: 10*@rem;
	}

	/* layout */
	@media screen and (min-width: 960px) {
		.login {
			width: @wrapper_max_w;
		}
	}
</style>