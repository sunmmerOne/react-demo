// 这是自动生成的文件，可以修改。

import * as types from './constants'
import { createInputFactory as CIF } from 'DynamicForm'
// import { cloneDeep } from '../../utils'

const initialState = {
    templateData: {},
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

const template = (state = initialState, { type, data })=>{
    switch(type){
        case types.TEMPLATE:
            /**
             * 这里返回一定要返回一个新的对象，而不能在原来的state基础上做修改
             * 正确的是
             * return { ...state }
             * 错误的是
             * state.data = xxx;
             * return state;
             *
             * 要达到newState !== oldState的效果
             * 视图的数据才会随着更改而更新，否则视图层不会更新
             */
            return { ...state, templateData: data };
        case types.UPDATE_FORM:

            data = data || initialState.form;

            return {
                ...state,
                form: {
                    ...state.form,
                    ...data
                }
            };

        default:
            return state;
    }
};


export default template;