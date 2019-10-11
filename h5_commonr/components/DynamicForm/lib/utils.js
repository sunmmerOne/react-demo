export const getUniqID = () => Math.random().toString(36).substr(2,6);

export const createFormItem = config => {
    const {
        label,
        itemProps,
        options,
        type,
        name,
        value,
        rules,
        children,
        props,
        fieldOption
    } = config;
    const formItem = {
        props: {
            key: name || getUniqID(),
        },
        input: {
            type,
        },
    };
    formItem.input.value = value;

    !!label && (formItem.props.label = label);
    !!name && (formItem.input.name = name);
    !!children && (formItem.input.children = children);
    !!props && (formItem.input.props = props);
    !!options && (formItem.input.options = options);
    !!rules && (formItem.rules = rules);
    !!fieldOption && (formItem.fieldOption = fieldOption);

    !!itemProps && (
        formItem.props = {
            ...formItem.props,
            ...itemProps,
        }
    );
    return formItem;
};