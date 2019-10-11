// 这是自动生成的文件，可以修改。
import * as type from './constants'
import { templateService } from '../../service'

const add = params => dispatch => templateService.add(params);

const updateForm = form => ({
    type: type.UPDATE_FORM,
    data: form,
});

const clearForm = form => ({
    type: type.UPDATE_FORM,
});


export {
    add,
    updateForm,
    clearForm,
};