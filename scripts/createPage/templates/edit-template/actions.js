// 这是自动生成的文件，可以修改。
import * as type from './constants'
import {templateService} from '../../service'

const update = params => dispatch => templateService.update(params);

// const updateForm = form => ({
//     type: type.UPDATE_FORM,
//     data: form,
// });
// const clearForm = form => ({
//     type: type.UPDATE_FORM,
// });

const getDetail = params => dispatch => {
    return templateService.getDetail(params)
        .then(res => {
            // dispatch(updateForm(res.data.data));
            return Promise.resolve(res.data.data);
        })
};

export {
    update,
    getDetail,
    // updateForm,
    // clearForm,
};