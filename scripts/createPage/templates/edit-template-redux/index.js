// 这是自动生成的文件，可以修改。
// base lib
import React, {PureComponent} from 'react'
import { history } from '@react-router'
import inject from '@inject'
import './style.scss'

// common & business components
import { Button, message } from 'antd'
import DynamicForm from 'DynamicForm'

// common data & utils
// import { NumberNull } from '../../common/data'

@inject('template')
class Template extends PureComponent {

    componentDidMount() {
        const { getDetail } = this.props.templateActions;
        const { id } = this.props.location.query;
        getDetail({id});
    }

    onSubmit = err => {
        if(!!err) return;
        const { update } = this.props.templateActions;
        const { form } = this.props.templateStore;
        // const {
        //     fields1,
        //     fields2,
        //     fields3,
        //     fields4,
        // } = form;
        // const params = {
        //     fields1,
        //     fields2,
        //     fields3,
        //     fields4,
        // };
        // update(params).then(() => history.go(-1))
    };

    // 表单联动
    // relateField1 = field1Value => {
    //     const { form } = this.state;
    //     this.dynamicForm.setFieldsValue({
    //         field1: field1Value,
    //     });
    //     this.setState({form});
    // };

    onChange = ({name, value}) => {
        const { updateForm } = this.props.templateActions;
        const { form } = this.props.templateStore;
        form[name] = value;
        updateForm(form);
    };

    render() {
        const { form } = this.props.templateStore;
        return (
            <div id="template">
                <DynamicForm
                    wrappedComponentRef={dynamicForm => this.dynamicForm = dynamicForm}
                    formFields={form}
                    fieldsConfig={fieldsConfig}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}>
                    <Button type='primary' htmlType='submit'>保存</Button>
                </DynamicForm>
            </div>
        );
    }
}

export default Template;
