import tools from '@/tools'

export default {
    // 获取未读消息
	GetMessage: () => {
        return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Personal/GetMessage`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
    },
    // 标记已读
	Readed: (obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpPost(`/api/ProjectDeclare/Personal/Readed`, obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
    }
}
