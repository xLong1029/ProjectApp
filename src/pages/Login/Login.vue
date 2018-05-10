<template>
	<div id="login">		
		<section class="login edge_frame">
			<h1 class="login_title">登 录</h1>
			<form>
				<div class="form_line">
					<input type="text" v-model="form.userName" placeholder="手机号码"/>
				</div>
				<div class="form_line">
					<input type="password" v-model="form.password" placeholder="密码"/>
				</div>
				<div class="form_line">
					<Checkbox :v-model="remember" @change="getCheckBoxValue">记住密码</Checkbox>
				</div>
				<div class="form_line">
					<input type="button" class="button" value="登录" @click="validForm"/>
				</div>
				<div class="form_line">
					<input type="button" class="button reg_btn" value="放弃登录，返回" @click="goBack"/>
				</div>
				<!-- <div class="form_line">
					<router-link class="button reg_btn" :to="{ name: 'Register' }">注册新用户</router-link>
				</div> -->
				<div class="form_line" style="color:#888;">
					测试账号：17777075292密码：mimashi123
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
	import Common from 'common/common.js';
	import { GetCookie, SetCookie, Encrypt, Decrypt, SetLocalS } from 'common/important.js';
	import { SetAccount } from 'common/account.js';
	// Api方法
	import Api from "api/login.js";
	// 混合
	import Modal from "mixins/modal.js";

	export default {
		name: "login",
		components: { Copyright, Checkbox },
		mixins: [ Modal ],
		data(){
			return{
				// 表单信息
				form:{
					// 用户名
					userName: '',
					// 密码
					password: ''
				},
				// 是否记住密码
				remember: false
			}
		},
		created(){
			if(GetCookie('username') && GetCookie('password')){
				this.form.userName = GetCookie('username');
				//解密
				this.form.password = Decrypt(GetCookie('password'));
				this.form.remember = true;
			}
		},
		methods:{
			// 验证表单
			validForm(){
				if(this.form.userName == ''){
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
				Api.Login(this.form)
				.then(res => {
					if(res.code == 200){
						// 记录用户信息
						SetAccount(this.$store.commit, res.data);

						// 记住密码
						if(this.remember){
							SetCookie('username', this.form.userName);
							//加密
							SetCookie('password', this.form.password);
						}

						Common.GotoPage('ProjectNews', {} , this);
						// 隐藏侧边栏
						this.$store.commit('SET_SHOW_SIDE_BAR', false);
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 从子组件获取Checkbox值
            getCheckBoxValue(e){
                this.remember = e[0];
			},
			// 返回上一页
			goBack(){
				this.$router.go(-1);
				// 隐藏侧边栏
				this.$store.commit('SET_SHOW_SIDE_BAR', false);
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