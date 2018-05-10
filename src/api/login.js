import tools from '@/tools'

export default {
    // 登录
	Login: (obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/ProjectDeclare/Passport/Login`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
	// 检查token
    CheckToken: (token) => {
        return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Passport/CheckToken?token=${token}`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
    }
}