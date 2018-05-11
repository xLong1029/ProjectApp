
/*
 * 功能 : 混入-弹窗设置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-3-1
 * 版本 : version 1.0
 */

export default {
	data() {
		return {}
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