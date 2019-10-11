// 这是自动生成的文件，可以修改。
// base lib
import React, {PureComponent} from 'react'
import { history } from '@react-router'
import inject from '@inject'
import './style.scss'

// common & business components
import DynamicForm from 'DynamicForm'

@inject('template')
class Template extends PureComponent {
    onSubmit = (err, params) => {
        if(!!err) return;
        this.props.templateActions.add(params)
            .then(this.dynamicForm.resetFields)
            .then(() => history.push('/'))
    };
    onChange = ({name, value}) => {
        const { updateForm } = this.props.templateActions;
        const { form } = this.props.templateStore;
        form[name] = value;
        updateForm(form);
    };

    render() {
        const { form, fieldsConfig } = this.props.templateStore;
        return (
            <div id="template">
                <DynamicForm
                    wrappedComponentRef={dynamicForm => this.dynamicForm = dynamicForm}
                    formFields={form}
                    hasBtn={true}
                    fieldsConfig={fieldsConfig}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}/>
            </div>
        );
    }
}

export default Template;
