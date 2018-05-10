import tools from '@/tools'

export default {
    // 登录
	ChangePassword: (obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/ProjectDeclare/Personal/ChangePassword`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
    },
}
