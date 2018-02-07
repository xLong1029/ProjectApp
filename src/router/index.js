import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Index from 'pages/Index/Index'
// 公司简介
import CompanyIntro from 'pages/AboutUs/CompanyIntro'
// 联系我们
import ContactUs from 'pages/AboutUs/ContactUs'
// 申报资讯
import ProjectNews from 'pages/News/ProjectNews'
// 资讯详情
import NewsDetail from 'pages/News/NewsDetail'
// 成功案例
import SuccCases from 'pages/Cases/SuccCases'
// 信息搜索
import Search from 'pages/Search/Search'


Vue.use(Router)

export default new Router({
  routes: [
    //域名重定向，默认地址优先显示home页面路径
    { path: "*", redirect: '/Index' },
    { path: '/Index', name: 'Index', component: Index },
    // 关于我们
    { path: '/CompanyIntro', name: 'CompanyIntro', component: CompanyIntro },
    { path: '/ContactUs', name: 'ContactUs', component: ContactUs },
    // 资讯
    { path: '/ProjectNews', name: 'ProjectNews', component: ProjectNews },
    { path: '/NewsDetail', name: 'NewsDetail', component: NewsDetail },
    // 搜索
    { path: '/Search', name: 'Search', component: Search },
    // 案例
    { path: '/SuccCases', name: 'SuccCases', component: SuccCases }
  ]
})
