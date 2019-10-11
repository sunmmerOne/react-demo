import * as type from './constants'
import Authority from '@client/business/Authority'
/**
 * 根据当前窗口宽度展开，收缩菜单栏
 */
const autoToggleMenuByWindowSize = () => (dispatch, getState) => {
    const windowWidth = window.innerWidth;
    const state = getState().root.appStore;
    const { menuShrink, smallWindowWidth } = state;

    if(windowWidth < smallWindowWidth && !menuShrink) {
        dispatch({
            type: type.SET_MENU_SHRINK,
            data: true,
        });
    } else if(windowWidth >= smallWindowWidth && menuShrink) {
        dispatch({
            type: type.SET_MENU_SHRINK,
            data: false,
        });
    }
};

// 展开收缩菜单栏
const toggleMenu = () => (dispatch, getState) => {
    const state = getState().root.appStore;
    const { menuShrink } = state;
    dispatch({
        type: type.SET_MENU_SHRINK,
        data: !menuShrink,
    });
};

// 获取菜单中有链接的元素
const getHasLinkMenus = () => (dispatch, getState) => {
    const state = getState().root.appStore;
    const { menuConfig } = state;
    const hasLinkMenus = [];
    /**
     * 获取菜单中有link元素的菜单元素，放到数组中，
     * 主要用于给顶部搜索栏提供数据
     * @param menus
     */
    const putHasLinkMenusBy = menus => {
        menus.forEach(menu => {
            if(!!menu.children) {
                putHasLinkMenusBy(menu.children);
            } else if(!!menu.link && !menu.disabled && Authority.isCurrentUserHasAuth(menu)) {
                hasLinkMenus.push(menu);
            }
        });
    };

    putHasLinkMenusBy(menuConfig);
    return hasLinkMenus;
};


const setMenuParams = firstLevelMenus => ({
    type: type.SET_MENU_PARAMS,
    data: firstLevelMenus,
});

export {
    toggleMenu,
    getHasLinkMenus,
    setMenuParams,
    autoToggleMenuByWindowSize,
};