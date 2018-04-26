import Vue from 'vue'
import Router from 'vue-router'

// 主页
import Main from 'pages/Main'
// 登录
import Login from 'pages/Login/Login'
// 未登录提示页
import UnLogined from 'pages/Login/UnLogined'
// 注册
import Register from 'pages/Register/Register'
// 申报资讯
import ProjectNews from 'pages/News/ProjectNews'
// 资讯详情
import NewsDetail from 'pages/News/NewsDetail'
// 个人中心
import UserCenter from 'pages/UserCenter/UserCenter'
import ChangePassword from 'pages/UserCenter/ChangePassword'
// 收藏夹
import CollectList from 'pages/Collection/CollectList/CollectList'
import CollectStore from 'pages/Collection/CollectList/CollectStore'
import CollectManage from 'pages/Collection/CollectList/CollectManage'
// 书签
import BookmarkList from 'pages/Collection/BookmarkList/BookmarkList'
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
            // 修改密码
            { path: '/ChangePassword', name: 'ChangePassword', component: ChangePassword },
            // 收藏夹
            { path: '/CollectList', name: 'CollectList', component: CollectList },
            // 书签列表
            { path: '/BookmarkList', name: 'BookmarkList', component: BookmarkList },
            // 未登录提示页
            { path: '/UnLogined', name: 'UnLogined', component: UnLogined },
        ]
    },
    // 收藏夹-编辑页
    { path: '/CollectStore', name: 'CollectStore', component: CollectStore },
    // 收藏夹-管理页
    { path: '/CollectManage', name: 'CollectManage', component: CollectManage },
    // 搜索
    { path: '/Search', name: 'Search', component: Search },
    // 登录
    { path: '/Login', name: 'Login', component: Login },
    // 注册
    { path: '/Register', name: 'Register', component: Register },
  ]
})
