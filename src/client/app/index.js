import React, {PureComponent} from 'react'
import '../utils/styles/index.scss'
import './style.scss'
import MLayout from '../layout'
import Breadcrumb from '../layout/Breadcrumb'
import {Spin, LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import inject from '@inject'
import {cookie} from '@utils'
import AppUtils from '../utils/App'

@inject('user', 'app')
class App extends PureComponent {
    state = {
        loading: false,
    };

    constructor(props) {
        super(props);
        AppUtils.init({
            showLoading: this.showLoading,
            hideLoading: this.hideLoading
        });
    }

    componentDidMount() {

    }

    showLoading = () => {
        this.setState({loading: true});
    };
    hideLoading = () => {
        this.setState({loading: false});
    };


    render() {
        const {routes, params} = this.props;
        return (

            <LocaleProvider locale={zhCN}>
                <div id='app-container'>
                    <Spin size='large'
                          spinning={this.state.loading}
                          wrapperClassName='app-spin-wrapper'>
                        <MLayout>
                            <Breadcrumb routes={routes} params={params}/>
                            {this.props.children}
                        </MLayout>
                    </Spin>
                </div>
            </LocaleProvider>
        )
    }
}


export default App;
