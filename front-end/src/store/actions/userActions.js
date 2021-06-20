import jwt_decode from 'jwt-decode';
import axios from '../../helpers/axios';
import {
    AUTHORIZE,
    UN_AUTHORIZE,
} from '../actionTypes';

export const register = (payload) => {
    return function(dispatch) {
        axios.post('auth/register', payload)
            .then(response => handleAuthResponse(response, dispatch))
            .catch(error => console.error(error));
    }
}

export const login = (payload) => {
    return function(dispatch) {
        axios.post('auth/login', payload)
            .then(response => handleAuthResponse(response, dispatch))
            .catch(error => console.error(error));
    }
}

export const logout = () => {
    return function (dispatch) {
        axios.post('auth/logout')
            .then(response => {
                if (response.data.success) {
                    localStorage.removeItem('accessToken');
                    dispatch({ type: UN_AUTHORIZE })
                }
            }).catch(error => console.error(error));
    }
}

export const resendVerificationMail = () => {
    return function() {
        axios.post('mailer', { action: 'welcome-mail' })
            .catch(error => console.log(error));
    }
}

export const verifyEmail = (payload) => {
    return function(dispatch) {
        const url = `auth/verify-email/${payload.user_id}/${payload.hash}`;
        const headers = { headers: { noLoading: true } };
        axios.get(url, headers)
            .then(response => {
                if (!response.data.success) {
                    const messageContainer = document.querySelector('.verificaton-text');
                    if (messageContainer) {
                        messageContainer.innerHTML = response.data.message;
                    }
                    return false;
                }
                handleAuthResponse(response, dispatch);
            }).catch(error => console.error(error));
    }
}

export const changeEmail = () => {
    return new Promise((resolve, reject) => {
        const headers = { headers: { noLoading: true } };
        axios.post('mailer', {action: 'change-email'}, headers)
            .then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
    })
}

function handleAuthResponse(response, dispatch) {
    const token = response.data.token;
    const tokenObject = jwt_decode(token);
    const user = tokenObject.user || {};
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
        type: AUTHORIZE,
        payload: {
            token,
            isAuthorised: true,
            user,
        }
    });
}