// 这是自动生成的文件，可以修改。
import * as types from './constants'
import { createInputFactory as CIF } from 'DynamicForm'
import { statusMap } from '../../common/data'
import { objToOptions } from '../../util'

const statusMapOptions = objToOptions(statusMap, true);
const initialState = {

    fieldsConfig: {
        // fields1: CIF('fields1').ph(),
        // fields2: CIF('fields2').ph(),
        // fields3: CIF('fields3').isSelect(statusMapOptions),
    },
    form: {
    //     fields1: '',
    //     fields2: '',
    //     fields3: '',
    },
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
    listData: [],
};

const template = (state = initialState, { type, data })=>{
    switch(type){
        case types.UPDATE_PAGINATION:

            data = data || initialState.pagination;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    ...data,
                }
            };

        case types.UPDATE_LIST_DATA:

            data = data || initialState.listData;

            return {
                ...state,
                listData: data
            };

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