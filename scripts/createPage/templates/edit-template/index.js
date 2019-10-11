// 这是自动生成的文件，可以修改。
// base lib
import React, {PureComponent} from 'react'
import { history } from '@react-router'
import inject from '@inject'
import './style.scss'

// common & business components
import { Button, message } from 'antd'
import DynamicForm, { createInputFactory as CIF } from 'DynamicForm'

// common data & utils
// import { NumberNull } from '../../common/data'
import { disableCIF } from '../../util'

@inject('template')
class Template extends PureComponent {
    state = {
        form: {
            // field1: "",
            // field2: "",
            // field3: "",
            // createBy: '',
            // dateCreated: '',
            // updateBy: '',
            // dateUpdated: '',
        },
        fieldsConfig: {
            // field1: disableCIF('field1'),
            // field2: CIF('field2').ph().isRequired(),
            // field3: CIF('field3').isSelect([{
            //     value: '0',
            //     text: '无效',
            // },{
            //     value: '1',
            //     text: '有效',
            // },]).isRequired(),
            // createBy: disableCIF('创建人'),
            // dateCreated: disableCIF('创建时间'),
            // updateBy: disableCIF('最后更新人ID'),
            // dateUpdated: disableCIF('更新时间'),
        },
    };
    componentDidMount() {
        const { getDetail } = this.props.templateActions;
        const { id } = this.props.location.query;
        getDetail({id})
            .then(data => this.setState(({ form }) => ({
                form: {
                    ...form,
                    ...data,
                }
            })));
    }

    onSubmit = err => {
        if(!!err) return;
        const { update } = this.props.templateActions;
        const { form } = this.state;
        // const {
        //     fields1,
        //     fields2,
        //     fields3,
        //     fields4,
        // } = this.state.form;
        // const params = {
        //     fields1,
        //     fields2,
        //     fields3,
        //     fields4,
        // };
        // update(params)
        //     .then(() => history.go(-1))
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
        const { form } = this.state;
        form[name] = value;
        this.setState({ form });
    };

    render() {
        const { form } = this.state;
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
