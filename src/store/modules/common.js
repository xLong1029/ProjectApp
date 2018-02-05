// 通用设置
const common = {
	state: {
		// 是否显示侧边栏
		showSideBar: false,
		// 是否显示标签栏
		showTabBar: true,
		// 是否显示返回按钮
		showBackBtn: false,
		// 导航栏标题
		navTitle: '华建项目申报',
	},
	// 计算属性
	getters: {
		showSideBar: state => state.showSideBar,
		showTabBar: state => state.showTabBar,
		showBackBtn: state => state.showBackBtn,
		navTitle: state => state.navTitle,
	},
	// 用来处理数据的函数，只能同步操作
	mutations: {
		SET_SHOW_SIDE_BAR: (state, showSideBar) => {
			state.showSideBar = showSideBar;
		},
		SET_SHOW_TAB_BAR: (state, showTabBar) => {
			state.showTabBar = showTabBar;
		},
		SET_SHOW_BACK_BTN: (state, showBackBtn) => {
			state.showBackBtn = showBackBtn;
		},
		SET_NAV_TITLE: (state, navTitle) => {
			state.navTitle = navTitle;
		},
	},
}

export default common;
