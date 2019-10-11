import axios from 'axios'
import { message } from 'antd'

const updateSuccessTips = res => new Promise((resolve, reject) => {
    message.success('编辑成功！');
    setTimeout(() => resolve(res), 150);
});

const addSuccessTips = res => new Promise((resolve, reject) => {
    message.success('添加成功！');
    setTimeout(() => resolve(res), 150);
});

export const userService = {
    getMenuAuth: params => axios.post('/getMenuAuth', params),
};
