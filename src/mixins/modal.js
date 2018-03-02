
/*
 * 功能 : 混入-弹窗设置
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
    },
    methods:{
        // 显示提示框，txt：文本， type: 弹窗类型
        showWarnModel(modalText, modalType){
            if(modalType){
                this.$store.commit('SET_WARN_MODAL', {
                    show: true,
                    showIcon: 'true',
                    text: modalText,
                    type: modalType
                });
            }
            else{
                this.$store.commit('SET_WARN_MODAL', {
                    show: true,
                    text: modalText
                });
            }
        },
    }
}