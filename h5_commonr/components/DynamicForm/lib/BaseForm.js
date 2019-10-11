import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Form, Button } from 'antd'
import InputFactory from './InputFactory'
import MyFormItem from './Item'
import { createFormItem, } from './utils'
import {
    defaultFormItemLayout,
    defaultButtonItemLayout,
    tailFormItemLayout,
    LAYOUT,
} from './config'

const FormItem = Form.Item;

class BaseForm extends Component {
    static LAYOUT = LAYOUT;

    constructor(props) {
        super(props);
        this.setInitialValue(props.formFields);
    }
    setInitialValue = formFields => {
        this.initialValue = this.formatFormValues(formFields);
    };
    /**
     * 数据格式转换
     * { name: 'tom' } => { name: { value: 'tom; } }
     * @param values
     * @returns {{}}
     */
    formatFormValues = values => {
        const res = {};
        for(let key in values){
            res[key] = { value: values[key] };
        }
        return res;
    };
    getFieldsValue = () => {
        return this.form.getFieldsValue();
    };

    onSubmit = e => {
        const { onSubmit, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll(onSubmit);
    };

    resetFields = () => this.props.form.setFields(this.initialValue);
    setFields = formFields => this.props.form.setFields(this.formatFormValues(formFields));
    setFieldsValue = values => this.props.form.setFieldsValue(values);
    validateFieldsAndScroll = cb => this.props.form.validateFieldsAndScroll(cb);

    getFormItemLayout = () => {
        const { layout } = this.props;
        let formItemLayout = layout === LAYOUT.HORIZONTAL ? defaultFormItemLayout : null;
        let buttonItemLayout = layout === LAYOUT.HORIZONTAL ? defaultButtonItemLayout : null;
        return formItemLayout;
    };

    createFormItemByConfig = formItemConfig => {
        const itemLayout = this.getFormItemLayout();
        const { getFieldDecorator } = this.props.form;
        return <MyFormItem
            key={formItemConfig.input.name}
            getFieldDecorator={getFieldDecorator}
            layout={itemLayout}
            config={formItemConfig}/>
    };

    addSmallProps = params => {
        if(!params.props){
            params.props = {};
        }
        if(!params.itemProps){
            params.itemProps = {};
        }

        if(this.props.small){
            params.props.className = 'small';
            params.props.size = 'small';
            params.itemProps.style = {
                marginBottom: 0,
            }
        }

    };
    getChildren = () => {
        if(this.props.small){
            return React.Children.map(this.props.children, child =>
                React.cloneElement(child, {size: 'small'}))
        }
        return this.props.children;
    };

    createFormItemsConfig({formFields, fieldsConfig}){
        const formItems = [];
        for (let key in formFields) {
            if (formFields.hasOwnProperty(key) && fieldsConfig.hasOwnProperty(key)) {
                let fieldConfig = fieldsConfig[key];

                if(fieldConfig instanceof InputFactory){
                    fieldConfig = fieldConfig.getInput();
                }
                const params = {
                    ...fieldConfig,
                    name: key,
                    value: formFields[key],
                };
                this.addSmallProps(params);
                formItems.push(createFormItem(params));
            }

        }
        return formItems;
    };

    render() {
        const { layout } = this.props;
        const { className, style, hasBtn } = this.props;
        const formItems = this.createFormItemsConfig(this.props);
        const formProps = {
            style,
            className,
            layout,
            onSubmit: this.onSubmit,
        };
        return (
            <Form { ...formProps } className='dynamic-form'>
                { formItems.map(this.createFormItemByConfig) }
                <FormItem { ...tailFormItemLayout }>
                    {
                        hasBtn ? (
                            <Button type="primary" htmlType="submit">保存</Button>
                        ) : this.getChildren()
                    }
                </FormItem>
            </Form>
        );
    }
}

BaseForm.defaultProps = {
    layout: LAYOUT.HORIZONTAL,
    hasBtn: false,
    small: false,
};
BaseForm.propTypes = {
    formFields: PropTypes.object.isRequired,
    fieldsConfig: PropTypes.object.isRequired,
    layout: PropTypes.oneOf([LAYOUT.HORIZONTAL, LAYOUT.INLINE, LAYOUT.VERTICAL]),
    small: PropTypes.bool,
    hasBtn: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default BaseForm;