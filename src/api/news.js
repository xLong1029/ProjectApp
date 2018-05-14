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
	},
	// 收藏文章
	AddArticle: (obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/Projectdeclare/Collect/Add`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
	// 获取分组
	GetGroups: (keyoword) => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/Projectdeclare/Collect/GetGroups`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
    },
}
