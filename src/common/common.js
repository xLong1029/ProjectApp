/*
 * 功能 : 封装通用常量与公共方法
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-2-5
 * 版本 : version 1.0
 */

export default {
    /* 公共方法 */

    // 时间格式化
    formatDate: (date) => {
        if(!date) return;
        if(typeof date =='string' && date.indexOf('-') != -1) return date;
        else{
            let year = date.getFullYear(); 
            let month = date.getMonth() + 1; 
            let day = date.getDate(); 
            let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(); 
            let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds(); 
            return year + "-" + month + "-" + day + ' ' + hour + ':' + minute + ':' + second; 
        }        
    },
    // 页面跳转
    gotoPage(routeName, params, _this){
        _this.$router.push({ name : routeName, query : params });
    }
}
