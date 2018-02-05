import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Index from 'pages/Index/Index'
// 公司简介
import CompanyIntro from 'pages/AboutUs/CompanyIntro'
// 联系我们
import ContactUs from 'pages/AboutUs/ContactUs'
// 新闻资讯
import NewsCenter from 'pages/NewsCenter/NewsCenter'
// 申报资讯
import ProjectNews from 'pages/ProjectNews/ProjectNews'
// 信息搜索
import Search from 'pages/Search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    //域名重定向，默认地址优先显示home页面路径
    { path: "*", redirect: '/Index' },
    { path: '/Index', name: 'Index', component: Index },
    { path: '/CompanyIntro', name: 'CompanyIntro', component: CompanyIntro },
    { path: '/ContactUs', name: 'ContactUs', component: ContactUs },
    { path: '/NewsCenter', name: 'NewsCenter', component: NewsCenter },
    { path: '/ProjectNews', name: 'ProjectNews', component: ProjectNews },
    { path: '/Search', name: 'Search', component: Search }
  ]
})
