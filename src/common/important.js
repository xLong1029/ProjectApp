/*
 * 功能 : 封装一些重要函数
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-3-1
 * 版本 : version 1.0
 */

// 设置cookie
export function SetCookie(cname, cvalue, exdays){
    if(exdays){
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }else{
        document.cookie = cname + "=" + cvalue + "; ";
    }
}
// 获取cookie
export function GetCookie(cname){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i ++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
// 删除cookie
export function DelCookie(cname){
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
// localstorage写入本地缓存
export function SetLocalS(key,value){
    localStorage.setItem(key, value);
}
// localstorage获取本地缓存
export function GetLocalS(key,value){
    let res = localStorage.getItem(key);
    if(res && res!='null') return res;
    else return false;
}
// localstorage删除本地储存
export function DelLocalS(key){
    localStorage.removeItem(key);
}
// localstorage清空本地储存
export function ClearLocalS(){
    localStorage.clear();
}
// 获取url传值参数
export function GetUrlQuery(name, thisUrl){
    let reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"), url = thisUrl || location.href;
　　if (reg.test(url)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
　　else return false;
}
// 获取参数值
export function GetParams(params){
    let obj = { key : [], value: [] };
    for(let i in params){
        obj.key.push(i);
        obj.value.push(params[i]);
    }
    return obj;
}
// 密码加密（简单模拟）
export function Encrypt(pwd){
    let value = '';
    for (let i = 0; i < pwd.length; i++) {
        let r = pwd.charCodeAt(i);
        value += String.fromCharCode(r + 2);
    }
    return value;
}
// 密码解密（简单模拟）
export function Decrypt(value){
    let pwd = '';
    for (let i = 0; i < value.length; i++) {
        let r = value.charCodeAt(i);
        pwd += String.fromCharCode(r - 2);
    }
    return pwd;
}

/**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
 * @param func 执行函数
 * @param wait 时间间隔
 * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
 *                如果你想禁用最后一次执行的话，传递{trailing: false}
 * @returns {Function}
 */
export function Throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}