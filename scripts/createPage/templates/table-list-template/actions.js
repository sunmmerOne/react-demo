// 这是自动生成的文件，可以修改。
import * as type from './constants'
import { templateService } from '../../service'
import { antdPToReqApiP, resApiPToAntP } from '../../utils'

const updateListData = data => ({
    type: type.UPDATE_LIST_DATA,
    data: data,
});

const updatePagination = data => ({
    type: type.UPDATE_PAGINATION,
    data: data,
});

const updateForm = data => ({
    type: type.UPDATE_FORM,
    data: data,
});

const getListData = params => (dispatch, getState) => {

    const { pagination, form } = getState().root.templateStore;

    let _parmas = {
        ...form,
        ...antdPToReqApiP(pagination),
        ...params
    };

    return templateService.getData(_parmas)
        .then(res => {
            let { records } = res.data.data;
            let newPagination = resApiPToAntP(res.data.data);

            dispatch(updateListData(records));
            dispatch(updatePagination(newPagination));

            return Promise.resolve();
        })
};

export {
    getListData,
    updatePagination,
    updateListData,
    updateForm,
};