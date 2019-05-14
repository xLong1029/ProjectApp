import axios from 'axios';
import { GetLocalS } from 'common/important.js';

// axios请求拦截
axios.interceptors.request.use(function (config){
	config.url = 'https://xmxx.zhujia100.com' + config.url;
	// 处理请求之前的配置
	return config;
}, function (error){
	// 请求失败的处理
	return Promise.reject(error);
});

export default {
	/*
	 * [封装get和post请求函数]
	 * @url 请求地址
	 * @params 请求的参数
	 * @headers 请求头部
	 */
	HttpGet:(url,params) => {
		let conf = { params };
		if(!(url.indexOf('Login') != -1)){
			conf = {
				params,
				headers:{
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					token: GetLocalS('project_token')
				}
			};
		}
		return axios.get(url, conf)
		.then(res => { return Promise.resolve(res.data) })
		.catch(err => { return Promise.reject(err) })	
	},
	HttpPost:(url,data)=>{
		let conf = {
			headers:{
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				token: GetLocalS('project_token')
			}
		};
		return axios.post(url, data, conf)
		.then(res => { return Promise.resolve(res.data) })
		.catch(err => { return Promise.reject(err) })
	}
}
