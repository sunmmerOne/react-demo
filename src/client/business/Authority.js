import React, {PureComponent} from 'react'
import { store } from '../index'
import isEqual from 'lodash/isEqual'

// 管理员等级
const ADMIN_LEVEL = 2;
// 超级管理员等级
const SUPER_ADMIN_LEVEL = 1;

/**
 * 权限模块
 */
class Authority {
    /**
     * 创建权限过滤器高阶组件
     * 控制需要权限验证模块的权限验证，
     * 如果用户有权限就显示该模块，
     * 没有就不显示。
     * @param WrappedComponent 需要控制权限的组件
     * @returns {AuthorityFilterHOC}
     * @constructor
     */
    createAuthorityFilterHOC(WrappedComponent) {
        const _this = this;

        class AuthorityFilterHOC extends PureComponent {
            state = {
                hasAuth: false,
            };
            componentDidMount() {
                this.setState({
                    hasAuth: _this.isCurrentUserHasAuth(this.props),
                })
            }
            render() {
                const { hasAuth } = this.state;
                const { authLevel, auth, ...props } = this.props;
                return hasAuth ? <WrappedComponent { ...props }/> : null;
            }
        }
        return AuthorityFilterHOC;
    };

    /**
     * 获取当前用户权限
     * @returns {*}
     */
    getCurrentUserAuthority() {
        const userStore = store.getState().root.userStore;
        const currentUserAuth = {
            userLevel: userStore.userLevel,
            userAuths: userStore.userAuths,
        };
        return currentUserAuth;
    }
    /**
     * 判断用户是否有权限
     * 根据用户的权限等级或者用户的权限列表判断，满足其一即可
     * 用户的权限等级， 1级最大，2级次之，以此类推
     * @param params: {
     *  authLevel: Num, 权限等级限制
     *  auth: string 权限名称
     *  }
     * @returns {boolean}
     */
    isCurrentUserHasAuth(params) {
        let levelLimit = params.authLevel;
        let authLimit = params.auth;

        const { userLevel , userAuths } = this.getCurrentUserAuthority();

        const needCheckAuth = this._isNeedCheckAuth(levelLimit, authLimit);
        if(!needCheckAuth){
            return true;
        }
        const userLevelIsPermit = this._userLevelIsPermit(userLevel, levelLimit);
        const userAuthIsValid = this._userAuthIsValid(userAuths, authLimit);
        return userLevelIsPermit || userAuthIsValid;

    };
    // 判断该组件需不需要检查权限
    _isNeedCheckAuth(levelLimit, authLimit) {
        if(levelLimit === undefined && authLimit === undefined) {
            return false;
        }
        return true;
    }
    // 用户的某个权限是否可用
    _userAuthIsValid(userAuths, authLimit) {
        return userAuths.indexOf(authLimit) > -1;
    }
    // 用户的等级是否允许
    _userLevelIsPermit(userLevel, levelLimit){
        if(/^\d*$/.test(levelLimit)){
            return userLevel <= levelLimit;
        } else {
            return userLevel === SUPER_ADMIN_LEVEL ;
        }
    }
}

export default new Authority();