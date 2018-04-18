import tools from '@/tools'

export default {
	// 资讯列表
	DeclareList: (obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Information/DeclareList`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
	// 资讯详情
	DeclareDetail: (id) => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Information/DeclareDetail?id=${id}`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	}
}
