// base lib
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { allReducer as allStates, allActions } from './index'

/**
 * key: action
 * value: bindDispatch(action)
 * @type {Map}
 */
const actionsCache = new Map();

/**
 * 根据data创建 mapState 和 mapActions
 * @param data 比如：baseStates, allStates, baseActions, allActions
 * @param src 比如 mapState方法传入的state对象或者mapAction中传入的dispatch对象
 * @param type 'state' , 'action'
 * @returns {{}}
 * 逻辑：
 * 根据data中的键值对，创建相应的mapState和mapActions
 *
 * 根据下面的例子改写
 * const mapState = (state)=>{
 *  return {
 *      app:state.root.app,
 *      user:state.root.user,
 *  }
 * };
 *
 * const mapDispatch = (dispatch)=>{
 *  return {
 *      appActions: bindActionCreators(appActions,dispatch),
 *  }
 * };
 */
function creatRedux(data, src, type) {
    let res = {};
    for(let i in data) {
        if(data.hasOwnProperty(i)){
            if(type === 'state') {
                res[i] = src.root[i];
            } else {
                if(!actionsCache.has(data[i])){
                    actionsCache.set(data[i], bindActionCreators(data[i],src))
                }
                // res[i] = bindActionCreators(data[i],src);
                res[i] = actionsCache.get(data[i]);
            }
        }
    }
    return res;
}

// 过滤处理state和action
function filterRedux(allsrc, filterReg) {
    let res = {};
    let resIsEmpty = true;
    for(let i in allsrc) {
        if(allsrc.hasOwnProperty(i) && filterReg.test(i)){
            res[i] = allsrc[i];
            resIsEmpty = false;
        }
    }
    if(!resIsEmpty){
        return res;
    }
    return null;
}

/**
 * 往组件中注入state和action
 * @param options 支持多个参数
 * 'app', 'user', ...
 */
export default function(options) {
    options = options ? [...arguments] : false;
    return function(component) {
        if(!options) {
            return component;
        }
        let componentName = component.name;

        let filterReg = new RegExp(options.join('|'), 'i');

        const mapState = state => {

            const userNeedsStates = filterRedux(allStates, filterReg);
            if(!userNeedsStates){
                console.warn(`${componentName} component没有找到可绑定的state`);
                return {};
            }
            const userNeedsStatesRedux = creatRedux(userNeedsStates, state, 'state');
            return userNeedsStatesRedux;
        };

        const mapDispatch = dispatch => {

            const userNeedsActions = filterRedux(allActions, filterReg);
            if(!userNeedsActions){
                console.warn(`${componentName} component没有找到可绑定的action`);
                return {};
            }
            const userNeedsActionsRedux = creatRedux(userNeedsActions, dispatch, 'action');
            return userNeedsActionsRedux;
        };

        return connect(mapState, mapDispatch)(component);
        // return connect(mapState, mapDispatch)(component);
    }
};



