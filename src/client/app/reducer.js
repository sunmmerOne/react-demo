import * as types from './constants'
import menuConfig from '@site/menuConfig'

const initialState = {
    footerText: '2018 中后台前端系统团队', // 页脚
    smallWindowWidth: 900, // 小屏幕宽度设置，达到小屏宽度时会自动收缩菜单栏
    menuShrink: false, // 菜单栏收缩状态
    autoToggleMenu: true, // 根据窗口宽度,自动展开收缩菜单栏
    shrinkingMenuBarWidth: 80, // 收缩的菜单栏宽度, 0|80 比较好看
    expandedMenuBarWidth: 225, // 展开的的菜单栏宽度
    menuConfig,
};

const app = (state = initialState, { type, data })=>{
    switch(type){
        case types.SET_MENU_SHRINK:
            return { ...state, menuShrink: data };
        case types.SET_MENU_PARAMS:
            let mapData = {};
            data.forEach(item => {
                mapData[item.funcname] = {
                    funcid: item.funcid,
                };
            });
            let menuConfig = state.menuConfig.map(menu => {
                return {
                    ...menu,
                    httpParams: mapData[menu.auth],
                };
            });
            return {
                ...state,
                menuConfig,
            };
        default:
            return state;
    }
};

export default app;