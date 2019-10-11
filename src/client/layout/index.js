import React, {PureComponent} from 'react'

import './style.scss'
import MenuSider from './MenuSider'
import inject from '@inject'
import Header from './Header'

import { Layout, Icon } from 'antd';
const { Content, Footer } = Layout;


@inject('app')
class MLayout extends PureComponent {
    componentDidMount() {
        const { autoToggleMenu } = this.props.appStore;
        if(autoToggleMenu){
            const { autoToggleMenuByWindowSize } = this.props.appActions;
            autoToggleMenuByWindowSize();
            window.addEventListener('resize', autoToggleMenuByWindowSize);
        }
    }
    componentWillUnmount() {
        const { autoToggleMenu } = this.props.appStore;
        if(autoToggleMenu){
            const { autoToggleMenuByWindowSize } = this.props.appActions;
            window.removeEventListener('resize', autoToggleMenuByWindowSize);
        }
    }
    render() {
        const { footerText, menuShrink, shrinkingMenuBarWidth, expandedMenuBarWidth } = this.props.appStore;
        const paddingLeftWidth = menuShrink ? shrinkingMenuBarWidth : expandedMenuBarWidth;
        console.log(paddingLeftWidth)
        return (
            <Layout
                style={{
                    overflow:'auto',
                    paddingLeft: paddingLeftWidth
                }}
                className='mlayout-wrapper wh100'>
                <MenuSider/>
                <Layout className='right-module'>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', height: 'auto' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Copyright&nbsp;
                        <Icon type="copyright" />
                        &nbsp;{footerText}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MLayout;