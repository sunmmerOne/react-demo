import { defaultConfig, INPUT_TYPE } from './config'

/**
 * 生成dynamicform配置的工具类
 */
export default class InputFactory {
    input = {};

    constructor(arg) {
        if(typeof arg === 'string') {
            this.input = {
                label: arg,
                type: defaultConfig.type,
            };
        } else if(typeof arg === 'object'){
            this.init(arg);
        }
    }

    init(input){
        this.input = input;
        return this;
    }
    fieldOption(config){
        if(!this.input.fieldOption){
            this.input.fieldOption = {};
        }
        this.input.fieldOption = {
            ...this.input.fieldOption,
            ...config,
        };
        return this;
    }
    rule(rule){
        if(!Array.isArray(this.input.rules)){
            this.input.rules = [];
        }
        this.input.rules.push(rule);
        return this;
    }
    removeRules(){
        this.input.rules = [];
        return this;
    }
    prop(prop){
        if(!this.input.props) {
            this.input.props = {};
        }
        this.input.props = {
            ...this.input.props,
            ...prop,
        };
        return this;
    }
    itemProp(prop){
        if(!this.input.itemProps) {
            this.input.itemProps = {};
        }
        this.input.itemProps = {
            ...this.input.itemProps,
            ...prop,
        };
        return this;
    }
    label(label){
        this.input.label = label;
        return this;
    }
    trigger(ListenerType = 'onChange'){
        return this.fieldOption({
            validateTrigger: ListenerType
        });
    }
    isButton(text, onClick){
        this.input = {
            // label,
            type: INPUT_TYPE.BUTTON,
            props: { onClick }
        };
        return this;
    }
    isDisable(){
        return this.prop({
            disabled: true,
        });
    }
    isEnable(){
        return this.prop({
            disabled: false,
        });
    }
    isRequired(message = `请输入${this.input.label}!`){
        return this.rule({
            required: true,
            message,
        });
    }
    ph(placeholder = `请输入${this.input.label}`){
        return this.prop({placeholder});
    }
    /**
     * 为表单元素添加验证方法
     * 可以是已经存在的验证type，或者自定义的验证方法
     * @param validator function
     * @returns {InputFactory}
     */
    validator(validator){
        if(!validator){
            throw '没有validator参数';
        }
        if(typeof validator !== 'function'){
            throw 'validator参数应该是一个函数！';
        }
        return this.rule({validator});
    }
    on(ListenerName, listener){

        const lowerCaseReg = /^[a-z]*$/;
        if(lowerCaseReg.test(ListenerName.charAt(0))){
            throw `事件名称：${ListenerName}的首字母应该是大写！`;
        }
        return this.prop({
            [`on${ListenerName}`]: listener
        });
    }
    isPassword(){
        return this.prop({
            type: 'password',
        });
    }
    isRadio(options){
        if(!options) throw '没有传options';
        this.input.type = INPUT_TYPE.RADIO;
        this.input.options = options;
        return this;
    }
    isCheckbox(options){
        if(!options) throw '没有传options';
        this.input.type = INPUT_TYPE.CHECKBOX;
        this.input.options = options;
        return this;
    }
    // select框带搜索功能时，的过滤选项方法
    filterOption(input, option){
        const reg = new RegExp(input, 'i');
        return reg.test(option.props.children);
    }
    isSelect(options, config = { showSearch: false, multiple: false }){
        const { showSearch, multiple } = config;

        if(!options) throw '没有传options';
        this.input.type = INPUT_TYPE.SELECT;
        this.input.options = options;
        if(showSearch) {
            this.prop({
                filterOption: this.filterOption,
                showSearch,
            });
        }
        if(multiple) {
            this.prop({
                mode: 'multiple',
            });
        }

        return this;

    }
    isDatePicker(format = 'YYYY-MM-DD'){
        this.input.type = INPUT_TYPE.DATEPICKER;
        return this.prop({
            format
        });
    }
    isText(){
        this.input.type = INPUT_TYPE.TEXTAREA;
        return this;
    }
    isDateRangePicker(format = 'YYYY-MM-DD'){
        this.input.type = INPUT_TYPE.RANGEPICKER;
        return this.prop({
            format
        });
    }
    is({type, prop, options}){

        const _type = type.toUpperCase();

        if(!INPUT_TYPE[_type]){
            throw `${type} 类型的组件不存在！`;
        }

        this.input.type = INPUT_TYPE[_type];
        !!options && (this.input.options = options);
        !!prop && this.prop(prop);

        return this;
    }
    getInput(){
        return { ...this.input };
    }
}

export const createInputFactory = label => new InputFactory(label);
