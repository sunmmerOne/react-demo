import React, {PureComponent} from 'react'
import './style.scss'
import { Link } from '@react-router'
import Authority from '@client/business/Authority'
import inject from '@inject'
import { cookie } from '@utils'
import isEmpty from 'lodash/isEmpty'
import PureHoc from 'PureHoc'

import { Layout, Menu, Icon } from 'antd';
const { SubMenu, Item } = Menu;
const { Sider } = Layout;
const hasGetedMenuAuth = [];

@PureHoc
@inject('app', 'user')
class MenuSider extends PureComponent {



    renderMenuItem = menu => {
        const { link, icon, text, httpParams, ...menuItemProps } = menu;

        const AuthorityMenuItemHOC = Authority.createAuthorityFilterHOC(Item);

        if(!!link) {
            return (
                <AuthorityMenuItemHOC {...menuItemProps}>
                    <Link to={link} >
                        {icon?<Icon type={icon} />:''}
                        {text?<span>{text}</span>:''}
                    </Link>
                </AuthorityMenuItemHOC>
            );
        }
        return (
            <AuthorityMenuItemHOC {...menuItemProps}>
                {icon?<Icon type={icon} />:''}
                {text?<span>{text}</span>:''}
            </AuthorityMenuItemHOC>
        );
    };
    setMenuCollapse = () => {
        const { menuShrink } = this.props.appStore;
        this.sider.setCollapsed(menuShrink);
    };

    componentDidMount() {
        this.setMenuCollapse();
    }

    componentDidUpdate() {
        this.setMenuCollapse();
    }

    getAuth(params){
        let hasGeted = hasGetedMenuAuth.some(item => item === params);
        if(!hasGeted){
            hasGetedMenuAuth.push(params);
            this.props.userActions.getSubMenuAuth(params);
        }
    }

    renderMenu = menu => {
        let AuthoritySubMenuHOC = Authority.createAuthorityFilterHOC(SubMenu);
        let { children, httpParams, ...rest } = menu;

        if(!isEmpty(httpParams)){
            rest.onTitleClick = () => this.getAuth(httpParams);
        }

        if(!!children) {
            return (
                <AuthoritySubMenuHOC {...rest}>
                    {
                        menu.children.map(smenu => {
                            if(!!smenu.children){
                                return this.renderMenu(smenu);
                            } else {
                                return this.renderMenuItem(smenu);
                            }
                        })
                    }
                </AuthoritySubMenuHOC>
            )
        }
        return this.renderMenuItem(menu);
    };
    render() {
        const { expandedMenuBarWidth, shrinkingMenuBarWidth, menuConfig } = this.props.appStore;
        return (
            <Sider
                ref={sider => this.sider = sider}
                width={expandedMenuBarWidth}
                collapsedWidth={shrinkingMenuBarWidth}
                className='menu-sider-wrapper'
                trigger={null}
                collapsible>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    {menuConfig.map(menu => this.renderMenu(menu))}
                </Menu>
            </Sider>
        );
    }
}

export default MenuSider;