import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import {
    inputTypeMaps,
    FormItem,
    Option,
} from './inputMap'

import {
    Radio,
    Checkbox,
} from 'antd'

import {
    INPUT_TYPE,
    defaultConfig,
} from './config'

const optionsComponents = {
    [INPUT_TYPE.SELECT]: Option,
    [INPUT_TYPE.RADIO]: Radio,
    [INPUT_TYPE.CHECKBOX]: Checkbox,
};

class MyFormItem extends Component {
    constructor(props) {
        super(props);
        this.initValue(props.config.input.value);
    }
    initValue(value){
        this.initialValue = value;
    }

    createOptions = (type, options) => {
        if(!type || !options) return;

        let optionsChildren;
        let Comp = optionsComponents[type] || Option;
        optionsChildren = options.map((item, index) => {
            const { text, ...optionProps } = item;
            return <Comp key={text || index} {...optionProps}>{text}</Comp>;
        });
        return optionsChildren;
    };

    getFormItemComponent = ({input, rules, fieldOption}) => {
        let {
            type = defaultConfig.type,
            name,
            props,
            value,
            options,
            children,
        } = input;

        const { getFieldDecorator } = this.props;
        const InputComponent = inputTypeMaps[type];


        const FormFieldOptions = {
            rules: rules || defaultConfig.rules,
            ...fieldOption,
            initialValue: value,
        };

        const optionsChildren = this.createOptions(type, options);
        let wrappedInput = <InputComponent {...props}/>;
        if(optionsChildren || children){
            wrappedInput = <InputComponent {...props}>{optionsChildren || children}</InputComponent>;
        }
        return getFieldDecorator(name, FormFieldOptions)(wrappedInput);
    };

    render() {
        const { layout, config } = this.props;
        const itemProps = config.props;

        return (
            <FormItem { ...layout } {...itemProps}>
                {this.getFormItemComponent(config)}
            </FormItem>
        );
    }
}

MyFormItem.prototypes = {
    layout: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
};

export default MyFormItem;