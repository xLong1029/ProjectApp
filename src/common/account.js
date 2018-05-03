/*
 * 功能 : 封装一些账户相关方法
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-4-23
 * 版本 : version 1.0
 */

import { DelCookie, DelLocalS } from 'common/important.js'

// 设置账户信息
export function setAccount(_commit, info){
    // 设置用户信息
    _commit('SET_USER_ACCOUNT', info.account);
    _commit('SET_USER_ID', info.userId);
    _commit('SET_USER_TYPE', info.userType);
}

// 清空账户信息
export function clearAccount(_commit){
    // 清除token
    DelCookie('project_token');
    // 清楚用户资料
    DelLocalS('userAccount');
    _commit('SET_USER_TOKEN', null);
    _commit('SET_USER_ACCOUNT', '');
    _commit('SET_USER_ID', '');
}