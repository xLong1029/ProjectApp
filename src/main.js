import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
// 全局引用Jquery
import $ from "jquery";

// 应用字体图标
require('./assets/iconfonts/style.css');

Vue.use(Vuex);

Vue.config.productionTip = false;

// 全局路由配置
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
router.beforeEach((to, from, next) => {	
	// A跳转到B，B页面停留在A页面的滚动位置；解决方法：将scrollTop设置为0
	window.scroll(0, 0);
	next();
});

new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
