import tools from '@/tools'

export default {
	// 首页
	Index: (obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Home/Index`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
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
	// 案例列表
	CaseList: () => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Information/CaseList`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
	// 资讯搜索
	Search: (obj) => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Information/Search`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
	// 关于我们
	AboutUs: () => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Company/AboutUs`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
	// 联系方式
	LinkInfo: () => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Company/LinkInfo`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
	// 提交联系方式
	PostContact: (obj) => {
		return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/ProjectDeclare/Link/Submit`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	}
}
