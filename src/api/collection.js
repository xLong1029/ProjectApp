import tools from '@/tools'

export default {
	// 修改收藏组名称
	EditGroup: (obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/Projectdeclare/Collect/EditGroup`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
	// 删除分组
	DeleteGroup: (obj) => {
		return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/Projectdeclare/Collect/DeleteGroup`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
    },
    // 搜索收藏的文章
	Search: (keyoword) => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/Projectdeclare/Collect/DeleteGroup?keyoword=${keyoword}`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
    },
    // 新增分组
	AddGroup: (name) => {
        return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/Projectdeclare/Collect/AddGroup?name=${name}`)
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
    // 获取分组下的文章列表
    GetArticles: (id) => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/Projectdeclare/Collect/GetArticles?id=${id}`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
    },
    // 取消收藏
	DeleteArticle: (obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/Projectdeclare/Collect/DeleteArticle`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	}
}
