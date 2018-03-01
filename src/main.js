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

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
