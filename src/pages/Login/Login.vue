<template>
	<div id="login">		
		<section class="login edge_frame">
			<h1 class="login_title">登 录</h1>
			<form>
				<div class="form_line">
					<input type="text" v-model="form.username" placeholder="手机号码"/>
				</div>
				<div class="form_line">
					<input type="password" v-model="form.password" placeholder="密码"/>
				</div>
				<div class="form_line">
					<Checkbox :v-model="form.remember" text="记住密码" @setCheckBoxValue="getCheckBoxValue"></Checkbox>
				</div>
				<div class="form_line">
					<input type="button" class="button" value="登录" @click="validForm"/>
				</div>
				<div class="form_line">
					<router-link class="button reg_btn" :to="{ name: 'Register' }">注册新用户</router-link>
				</div>
				<div class="form_line" style="color:#888;">
					测试账号：18376686974密码：666666
				</div>
			</form>
		</section>
		<!-- 版权信息 -->
		<Copyright></Copyright>
	</div>
</template>

<script>
	// 组件
	import Copyright from "components/Common/Copyright.vue";
	import Checkbox from "components/Form/Checkbox.vue";
	// 通用js
	import Common from 'common/common.js'
	import { GetCookie, SetCookie, Encrypt, Decrypt } from 'common/important.js'
	// Api方法
	import Api from "api/login.js";
	// 混合
	import Modal from "mixins/modal.js"

	export default {
		name: "login",
		components: { Copyright, Checkbox },
		mixins: [ Modal ],
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
			if(GetCookie('username') && GetCookie('password')){
				this.form.username = GetCookie('username');
				//解密
				this.form.password = Decrypt(GetCookie('password'));
				this.form.remember = true;
			}
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
				if(this.form.username == 18376686974 && this.form.password == 666666){
					// 记住密码
					if(this.form.remember){
						SetCookie('username', this.form.username);
						//加密
						SetCookie('password', Encrypt(666666));
					}
					// token存cookie
					SetCookie('project_token', '12345678');
					this.$store.commit('SET_USER_ACCOUNT', 'xLong1029');
					Common.GotoPage('ProjectNews', {} , this);
				}
				else{
					this.showWarnModel('用户名密码不正确！', 'fail');
				}
			},
			// 从子组件获取Checkbox值
            getCheckBoxValue(value){
                this.form.remember = value;
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
	
	/* layout */
	@media screen and (min-width: 960px) {
		.login {
			width: @wrapper_max_w;
		}
	}
</style>