
/*
 * 功能 : 混入-页面滚动和加载更多参数
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-3-1
 * 版本 : version 1.0
 */

export default {
	data() {
		return {
			// 是否加载更多
            loadMore: false,
            // 是否显示返回顶部按钮
            showTopBtn: false,
            // 显示新闻数量
            listNum: 10,
            // 用来监听是否在加载，如果正在加载不再多请求接口
			loadMoreNow: false,
		}
	}
}