import {Breadcrumb} from 'antd'
import { Link, history, browserHistory, hashHistory } from '@react-router';
import React from 'react'
import './style.scss'


function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}

//面包屑导航
export default ({routes, params}) => {
    if(!routes[1].path && routes.length === 2) {
        // 如果是一级页面，就没必要显示面包屑导航了。
        return null;
    } else if(history === browserHistory) {
        return <Breadcrumb itemRender={itemRender} routes={routes}/>;
    } else {
        return <Breadcrumb routes={routes} params={params} />;
    }
}
