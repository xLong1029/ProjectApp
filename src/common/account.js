/*
 * 功能 : 封装一些账户相关方法
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-4-23
 * 版本 : version 1.0
 */

import { DelCookie, DelLocalS, SetCookie, SetLocalS } from 'common/important.js'

// 设置账户信息
export function SetAccount(_commit, info){
    SetCookie('project_token', info.token);
    SetLocalS('userAccount', info);

    _commit('SET_USER_TOKEN', info.token);
    _commit('SET_USER_ACCOUNT', info);
    _commit('SET_IS_LOGINED', true);
}

// 清空账户信息
export function ClearAccount(_commit){
    DelCookie('project_token');
    DelLocalS('userAccount');

    _commit('SET_USER_TOKEN', null);
    _commit('SET_USER_ACCOUNT', {});
    _commit('SET_IS_LOGINED', false);
}