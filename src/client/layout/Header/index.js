import React, {PureComponent} from 'react'
import { history, Link } from '@react-router'
import HeaderSearch from 'HeaderSearch'
import inject from '@inject'
import './style.scss'
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import accountMenuConfig from './accountMenuConfig'

let hasLinkMenusTexts = [];
let hasLinkMenus = [];

@inject('user', 'app')
class Header extends PureComponent {
    state = {
        menuConfig: accountMenuConfig,
        dataSource: [],
    };

    componentDidMount() {
        this.initHasLinkMenusTexts();
    }

    initHasLinkMenusTexts = () => {
        try {
            hasLinkMenus = this.props.appActions.getHasLinkMenus();
            hasLinkMenusTexts = hasLinkMenus.map(menu => menu.text);
        }catch (e){
            console.warn('initHasLinkMenusTexts error');
        }
    };
    componentDidUpdate() {
        this.initHasLinkMenusTexts();
    }


    renderMenuItem = menu => {
        const menuItemProps = {key: menu.key};
        menu.disabled && (menuItemProps['disabled'] = true);

        if(!!menu.link) {
            return (
                <Menu.Item {...menuItemProps}>
                    <Link to={menu.link}>
                        {menu.icon?<Icon type={menu.icon} />:''}
                        {menu.text?<span>{menu.text}</span>:''}
                    </Link>
                </Menu.Item>
            );
        } else if(menu.isDivider) {
            return <Menu.Divider key={menu.key}/>;
        } else {
            return (
                <Menu.Item {...menuItemProps}>
                    {menu.icon?<Icon type={menu.icon} />:''}
                    {menu.text?<span>{menu.text}</span>:''}
                </Menu.Item>
            );
        }

    };
    renderMenu = menu => {
        if(!!menu.children) {
            return (
                <SubMenu key={menu.key} title = {menu.title}>
                    {
                        menu.children.map(smenu => {
                            if(!!smenu.children){
                                return this.renderMenu(smenu);
                            } else {
                                return this.renderMenuItem(smenu);
                            }
                        })
                    }
                </SubMenu>
            )
        }
        return this.renderMenuItem(menu);
    };

    // 以下方法是搜索框的
    handleSearchInput = value => {
        if(!value) return;
        try{
            const reg = new RegExp(value, 'i');
            const dataSource = hasLinkMenusTexts.filter(menu => reg.test(menu));
            this.setState({ dataSource });
        }catch (e){}
    };
    handleOnSelect = value => {
        const selectedMenu = hasLinkMenus.find(menu => menu.text === value);
        if(selectedMenu && selectedMenu.link) {
            history.push(selectedMenu.link);
        }
    };

    render() {
        const menuEle = (
            <Menu>{ accountMenuConfig.map(menu => this.renderMenu(menu)) }</Menu>
        );
        const { avatar, username } = this.props.userStore;
        const { menuShrink } = this.props.appStore;
        const { toggleMenu } = this.props.appActions;

        let avatarProps = !!avatar ? { src: avatar } : { icon: 'user' };

        return (
            <Layout.Header className='mheader' >
                <Icon
                    className="trigger"
                    type={menuShrink ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggleMenu} />

                <HeaderSearch
                    onSearch={this.handleSearchInput}
                    onSelect={this.handleOnSelect}
                    placeholder='请输入想要跳转的菜单名称'
                    dataSource={this.state.dataSource}/>

                <Dropdown overlay={menuEle} placement="bottomRight">
                    <div className='avatar-wrapper'>
                        <Avatar {...avatarProps}/>
                        <span>&nbsp;&nbsp;{username}</span>
                    </div>
                </Dropdown>
            </Layout.Header>
        );
    }
}

export default Header;