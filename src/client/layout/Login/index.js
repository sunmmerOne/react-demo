import React, {PureComponent} from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';

const FormItem = Form.Item;

import Footer from '../Footer'
import './style.less'
import inject from '@inject'

@inject('user')
class Login extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.userActions.deleteLoginInfo();
    }

    login = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.userActions.doLogin();
            }
        });
    };
    getIcon = (type = 'user', style = { color: 'rgba(0,0,0,.25)' }) => {
        return <Icon type={type} style={style} />
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id='login'>
                <Row className='content'>
                    <Col span={12} xs={24} className="form-wrapper">
                        <div>
                            <div className="icon">
                                <Icon type="gitlab" style={{fontSize: '70px'}} />
                            </div>
                            <Form onSubmit={this.login} className="login-form">
                                <FormItem>
                                    {
                                        getFieldDecorator('userName', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your username!'
                                            }],
                                        })(
                                            <Input prefix={this.getIcon('user')} placeholder="Username" />
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your Password!'
                                        }],
                                    })(
                                        <Input prefix={this.getIcon('lock')} type="password" placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>Remember me</Checkbox>
                                    )}
                                    <a className="login-form-forgot">Forgot password</a>
                                    <br/>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    <br/>
                                    Or <a>register now!</a>
                                </FormItem>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Footer/>
            </div>
        )
    }
}

export default Form.create()(Login);