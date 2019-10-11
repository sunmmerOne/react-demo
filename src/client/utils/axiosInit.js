import axios from 'axios'
import React from 'react'
import { serverUrl } from '../common/config'
import { checkLoginStatus } from '../business/user/actions'
import { message } from 'antd'
import App from './App'

// 服务端地址
axios.defaults.baseURL = serverUrl;

// 异步请求标记
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// json数据格式传输
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';

// 跨域时是否带上cookie
// axios.defaults.withCredentials = true;

// 请求超时时间配置(ms)
axios.defaults.timeout = 20000;


// 请求拦截器
axios.interceptors.request.use(config => {
    // 请求之前，搞些事情
    // 检查登录态

    const isLogin = checkLoginStatus();
    const isTodoLogin = /login/i.test(config.url);

    if(isLogin || isTodoLogin) {
        App.showLoading();
        return config;
    }

    throw '重新登录吧！！！';
}, error => {
    // 请求失败的时候，搞些事情
    App.hideLoading();
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    // 服务端响应成功时，搞些事情
    App.hideLoading();
    if(response.data.retCode !== '000000'){
        message.error(response.data.retMessage);
        throw response;
    }
    return response;
}, error => {
    // 服务端响应失败时，搞些事情
    console.log(error);
    App.hideLoading();
    message.error(error.toString());
    return Promise.reject(error);
});


let prop = {
    configurable: true,
    enumerable: false,
    value: axios,
    writable: false
};
// 将axios挂载到react对象和window对象上
Object.defineProperty(React, '$http', prop);
Object.defineProperty(React, 'axios', prop);
Object.defineProperty(window, 'axios', prop);
Object.defineProperty(window, '$http', prop);
