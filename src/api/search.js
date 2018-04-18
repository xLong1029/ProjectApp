import tools from '@/tools'

export default {
	// 资讯搜索
	Search: (obj) => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Information/Search`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	}
}
