import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Main from 'pages/Main'
// 登录
import Login from 'pages/Login/Login'
// 注册
import Register from 'pages/Register/Register'
// 申报资讯
import ProjectNews from 'pages/News/ProjectNews'
// 资讯详情
import NewsDetail from 'pages/News/NewsDetail'
// 个人中心
import UserCenter from 'pages/UserCenter/UserCenter'
import Collection from 'pages/UserCenter/Collection'
// 信息搜索
import Search from 'pages/Search/Search'


Vue.use(Router)

export default new Router({
  routes: [
    //域名重定向，默认地址优先显示咨询列表页面路径
    { path: "*", redirect: '/Main' },
    {
        redirect: '/ProjectNews',
        path: '/Main',
        name: 'Main',
        component: Main,
        children:[
            // 资讯
            { path: '/ProjectNews', name: 'ProjectNews', component: ProjectNews },
            { path: '/NewsDetail', name: 'NewsDetail', component: NewsDetail },
            // 个人中心
            { path: '/UserCenter', name: 'UserCenter', component: UserCenter },
            // 收藏夹
            { path: '/Collection', name: 'Collection', component: Collection },
        ]
    },
    // 搜索
    { path: '/Search', name: 'Search', component: Search },
    // 登录
    { path: '/Login', name: 'Login', component: Login },
    // 注册
    { path: '/Register', name: 'Register', component: Register },
  ]
})
