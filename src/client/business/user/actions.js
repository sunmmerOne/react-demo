import * as type from './constants'
import { history } from '@react-router'
import { userService } from '@client/service'
import {cookie} from '@utils'
import { message } from 'antd'


// 登陆业务
const doLogin = param => dispatch => {
    console.log('doLogin');
    // todo: 保存登陆信息;
};
const saveLoginInfo = param => dispatch => {
    console.log('_saveLoginInfo');
};
// 登出业务
const doLogout = param => dispatch => {
    history.push('/login');
    // todo: 删除登陆状态
};
const deleteLoginInfo = param => dispatch => {
    console.log('_deleteLoginInfo');
};
// 检查登陆状态
const checkLoginStatus = param => {
    // console.log('checkLoginStatus');
    return Promise.resolve();
};

const getMenuAuth = () => (dispatch, getState) => {
    const ticketId = cookie.get("user");
    if(!ticketId){
        message.error('请使用带有bticket的链接访问本站！');
        throw '没有cookie参数！';
    }

    let params = {
        menuCode: "0",
        location: 0,
        menuType: "1",
        ticketId,
    };

    return userService.getMenuAuth(params)
        .then(response => {
            let menus = response.data.data.list;
            let username = response.data.data.userId;

            const auths = menus.map(item => item.funcname);
            dispatch({
                type: type.UPDATA_AUTHS,
                data: auths,
            });
            dispatch({
                type: type.SAVE_USER_INFO,
                data: {username},
            });
            return Promise.resolve(response.data.data.list);
        });
};

const getSubMenuAuth = ({funcid}) => dispatch => {

    let params = {
        menuCode: funcid,
        menuType: "2",
        ticketId: cookie.get("user")
    };

    return userService.getMenuAuth(params)
        .then(response => {
            let menus = response.data.data.list;
            const auths = menus.map(item => item.funcname);
            dispatch({
                type: type.UPDATA_AUTHS,
                data: auths,
            });
        });
};

const getUserAuths = params => dispatch => {
    dispatch({
        type: type.UPDATA_AUTHS,
        data: params,
    });
};


export {
    doLogin,
    saveLoginInfo,
    doLogout,
    getMenuAuth,
    getSubMenuAuth,
    deleteLoginInfo,
    checkLoginStatus,
    getUserAuths,
};