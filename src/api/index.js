import tools from '@/tools'

export default {
	// Api方法
	funtioncName:(obj) => {
        return new Promise((resolve,reject)=>{
			tools.HttpPost('/api/url', obj)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
}
