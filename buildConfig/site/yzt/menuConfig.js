import React from 'react'
import {Icon} from 'antd'

export default [

    {
        key: '基础管理',
        title: <span><Icon type="appstore"/><span>基础管理</span></span>,
        auth: '',
        children: [
            {
                key: '首页',
                text: '首页',
                auth: '',
                link: 'home',
            },
            {
                key: 'newModal',
                text: 'newModal',
                auth: '',
                link: 'newModal',
            },
        ]
    },
    {
        key: '高级',
        title: <span><Icon type="appstore"/><span>高级功能</span></span>,
        auth: '',
        children: [
            {
                key: 'bbs',
                text: 'bbs',
                auth: '',
                link: 'bbs',
            },
        ]
    },

];
