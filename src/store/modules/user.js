import { GetCookie, GetLocalS } from 'common/important.js';
import { SetAccount, ClearAccount } from 'common/account.js';
// Api方法
import Api from "api/login.js";

// 用户信息
const user = {
	// 负责存储整个应用的状态数据
	state: {		
	  	// 登录凭证
        token: GetCookie('project_token'),
        // 用户账号
		userAccount: GetLocalS('userAccount'),
		// 是否已登录
		isLogined: GetCookie('project_token') ? true : false,
	},
	// 计算属性
	getters: {
        token: state => state.token,
		userAccount: state => state.userAccount,
		isLogined: state => state.isLogined
	},
	// 用来处理数据的函数，只能同步操作
	mutations: {
        SET_USER_TOKEN: (state, token) => {
            state.token = token;
        },
		SET_USER_ACCOUNT: (state, userAccount) => {
	      state.userAccount = userAccount;
		},
		SET_IS_LOGINED: (state, isLogined) => {
			state.isLogined = isLogined;
		},
	},
	// 异步操作
	actions: {
        // 验证token
        CheckToken ({ commit , state }) {
			Api.CheckToken(GetCookie('project_token'))
			.then(res => {
				const result = res.data;
				// 登录认证成功
				if(res.code == 200)
					SetAccount(commit, result);
				// 登录认证失败
				else ClearAccount(commit);
			})
			.catch(err => {
				ClearAccount(commit);
			});
        }
    }
}

export default user;