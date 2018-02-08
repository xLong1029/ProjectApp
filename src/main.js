import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'babel-polyfill'

// 应用字体图标
require('./assets/iconfonts/style.css');
// 引用swiper插件CSS
require('swiper/dist/css/swiper.css')

Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
