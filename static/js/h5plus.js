
/*
 * 功能 : HTML5+管理客户端事件
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-8-30
 * 版本 : version 1.0
 */

// 监听本机返回键
document.addEventListener('plusready',function(){
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
    webview.canBack(function(e) {
            if (e.canBack) {
                    webview.back();
            }
            else {
                webview.close(); // 隐藏或退出应用
            }
        })
    });
});