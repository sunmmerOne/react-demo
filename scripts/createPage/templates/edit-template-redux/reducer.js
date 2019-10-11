// 这是自动生成的文件，可以修改。

import * as types from './constants'
// import { cloneDeep } from '../../utils'
import { createInputFactory as CIF } from 'DynamicForm'

import { statusMap } from '../../common/data'
import { objToOptions, disableCIF } from '../../util'

const statusMapOptions = objToOptions(statusMap);

const initialState = {
    templateData: {},
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
        // field3: CIF('field3').isRadio(statusMapOptions).isRequired(),
        // createBy: disableCIF('创建人'),
        // dateCreated: disableCIF('创建时间'),
        // updateBy: disableCIF('最后更新人ID'),
        // dateUpdated: disableCIF('更新时间'),
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