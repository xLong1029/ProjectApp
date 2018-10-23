import tools from '@/tools'

export default {
    AboutUs: () => {
		return new Promise((resolve,reject)=>{
			tools.HttpGet(`/api/ProjectDeclare/Company/AboutUs`)
			.then(res => resolve(res))
			.catch(err => reject(err))
		})
	},
}
