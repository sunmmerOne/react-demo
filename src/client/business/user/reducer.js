import * as types from './constants'

const initialState = {
    stepInfo: '',
    avatar: '',
    username: 'admin',
    userLevel: 99,
    userAuths: ['']
};

const user = (state = initialState, { type, data })=>{
    switch(type){
        case types.SAVE_USER_INFO:
            return { ...state, ...data };
        case types.UPDATA_AUTHS:
            return { ...state, userAuths: [ ...state.userAuths, ...data ] };
        default:
            return state;
    }
};


export default user;