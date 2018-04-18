<template>
	<div id="register">		
		<section class="register edge_frame">
			<h1 class="register_title">注 册</h1>
			<form>
				<div class="form_line">
					<input type="text" v-model="form.username" placeholder="手机号码"/>
				</div>
				<div class="form_line">
					<input type="text" class="fl" v-model="form.validCode" placeholder="验证码" style="width:60%;" />
					<input type="button" class="fr button" value="获取验证码" @click="getCode" style="width:38%;" />
				</div>
				<div class="form_line">
					<input type="text" v-model="form.password" placeholder="密码"/>
				</div>
				<div class="form_line">
					<input type="checkbox" name="agree" v-model="form.agree" />同意《华建项目申报平台协议》
				</div>
				<div class="form_line">
					<input type="button" class="button" value="注册" @click="validForm"/>
				</div>
				<div class="form_line">
					<router-link class="button login_btn" :to="{ name: 'Login' }">已有账号，去登录</router-link>
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
	import Api from "api/register.js";

	export default {
		name: "register",
		components: { Copyright },
		data(){
			return{
				// 表单信息
				form:{
					// 用户名
					username: '',
					// 验证码
					validCode: '',
					// 密码
					password: '',
					/// 是否同意协议
					agree: true
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
				else if(this.form.validCode == ''){
					this.showWarnModel('请输入验证码', 'warning');
					return false;
				}
				else if(this.form.password == ''){
					this.showWarnModel('请输入密码', 'warning');
					return false;
				}
				else if(!this.form.agree){
					this.showWarnModel('请同意协议', 'warning');
					return false;
				}
				else{
					this.onSubmit();
				}
			},
			// 提交表单
			onSubmit(){
			},
			// 获取验证码
			getCode(){

			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	.register{
		position: fixed;
		width: 100%;
		top: 50%;
		.mt(-200);
	}

	.register_title{
		text-align: center;
		color: @base_color;
		.mb(20);
	}

	.login_btn{
		background: #ecaa1e;
	}

	.bottom{
		position: absolute;
		width: 100%;
		bottom: 10*@rem;
	}
</style>