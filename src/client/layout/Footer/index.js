import React, {PureComponent} from 'react'
import './style.scss'
import { Icon } from 'antd'
import inject from '@inject'

@inject('appStore')
class Footer extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { footerText } = this.props.appStore;
        return (
            <div className={`footer ${this.props.className || ''}`}>
                <div className="copyright">
                    Copyright&nbsp;
                    <Icon type="copyright" />
                    &nbsp;{footerText}
                </div>
            </div>
        )
    }
}

export default Footer;