import { GetCookie, GetLocalS } from 'common/important.js'

// 用户信息
const user = {
	// 负责存储整个应用的状态数据
	state: {		
	  	// 登录凭证
        token: GetCookie('project_token'),
        // 用户账号
		userAccount: GetLocalS('userAccount').name,
	  	// 用户ID
	  	userId: '',
	},
	// 计算属性
	getters: {
        token: state => state.token,
		userAccount: state => state.userAccount,		
		userId: state => state.userId,
	},
	// 用来处理数据的函数，只能同步操作
	mutations: {
        SET_USER_TOKEN: (state, token) => {
            state.token = token;
        },
		SET_USER_ACCOUNT: (state, userAccount) => {
	      state.userAccount = userAccount;
	    },	    
	    SET_USER_ID: (state, userId) => {
	      state.userId = userId;
	    }
	}
}

export default user;