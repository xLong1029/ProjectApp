import tools from '@/tools'

export default {
	// Api方法
	Index:(obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpGet('/api/ProjectDeclare/Home/Index', obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},

}
