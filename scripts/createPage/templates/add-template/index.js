// 这是自动生成的文件，可以修改。
// base lib
import React, {PureComponent} from 'react'
import { history } from '@react-router'
import inject from '@inject'
import './style.scss'

// common & business components
import DynamicForm, { createInputFactory as CIF } from 'DynamicForm'

// common data & utils
// import { NumberNull } from '../../common/data'


@inject('template')
class Template extends PureComponent {
    state = {
        form: {
            // field1: "",
            // field2: '',
            // field3: "1",
        },
        fieldsConfig: {
            // field1: CIF('field1').isRequired().ph(),
            // field2: CIF('field2').ph(),
            // field3: CIF('field3').isRadio([{
            //     value: '0',
            //     text: '无效',
            // },{
            //     value: '1',
            //     text: '有效',
            // },]).isRequired(),
        },
    };
    onSubmit = err => {
        if(!!err) return;
        let params = this.state.form;
        // this.props.templateActions.add(params).then(() => history.push(''))
    };
    onChange = ({name, value}) => {
        const { form } = this.state;
        form[name] = value;
        this.setState({ form });
    };

    render() {
        const { form, fieldsConfig } = this.state;
        return (
            <div id="template">
                {/*<DynamicForm*/}
                    {/*ref={dynamicForm => this.dynamicForm = dynamicForm}*/}
                    {/*formFields={form}*/}
                    {/*hasBtn={true}*/}
                    {/*fieldsConfig={fieldsConfig}*/}
                    {/*onSubmit={this.onSubmit}*/}
                    {/*onChange={this.onChange}/>*/}
            </div>
        );
    }
}

export default Template;
