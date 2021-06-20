import { AUTHORIZE, UN_AUTHORIZE } from '../actionTypes';

const INITIAL_STATE = {
    isAuthorised: false,
    token: null,
    user: {},
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTHORIZE:
            return { ...state, ...action.payload }
        case UN_AUTHORIZE:
            return {
                isAuthorised: false,
                token: null,
                user: {},   
            }
        default:
            return {
                isAuthorised: localStorage.getItem('accessToken') ? true : false,
                token: localStorage.getItem('accessToken'),
                user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
            };
    }
}

export default UserReducer;