// base lib
import { combineReducers } from "redux"

// 导入 reducer
import homeStore from '../pages/home/reducer'
import userStore from '../business/user/reducer'
import appStore from '../app/reducer'

// list[{id}, {}];
// list string[];
// map: id => obj;

// 导入 actions
import * as homeActions from '../pages/home/actions'
import * as userActions from '../business/user/actions'
import * as appActions from '../app/actions'

// 将reducer 加入自动注入对象
export const allReducer = {
    homeStore,

    userStore,
    appStore,
};

// 将actions 加入自动导入对象
export const allActions = {
    homeActions,

    userActions,
    appActions,
};

const rootReducer = combineReducers(allReducer);

export default rootReducer;