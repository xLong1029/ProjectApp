import { GetLocalS } from 'common/important.js';
import { SetAccount, ClearAccount } from 'common/account.js';
// Api方法
import Login from "api/login.js";
import Msg from "api/message.js";

// 用户信息
const user = {
	// 负责存储整个应用的状态数据
	state: {		
	  	// 登录凭证
        token: GetLocalS('project_token'),
        // 用户账号
		userAccount: GetLocalS('userAccount'),
		// 是否已登录
		isLogined: GetLocalS('project_token') ? true : false,
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
			Login.CheckToken(GetLocalS('project_token'))
			.then(res => {
				const result = res.data;
				// 登录认证成功
				if(res.code == 200) SetAccount(commit, result);
				// 登录认证失败
				else ClearAccount(commit);
			})
			.catch(err => {
				ClearAccount(commit);
			});

			// 获取未读消息条数
			Msg.GetMessage()
			.then(res => {
				if(res.code == 200) commit('SET_UN_READ_COUNT', res.data.unRead); 
				else commit('SET_UN_READ_COUNT', 0);
			})
			.catch(err => console.log(err))
        }
    }
}

export default user;