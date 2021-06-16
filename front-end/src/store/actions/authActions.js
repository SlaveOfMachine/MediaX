import jwt_decode from 'jwt-decode';
import axios from '../../helpers/axios';
import { AUTHORIZE } from '../actionTypes';

export const login = (payload) => {
    return function(dispatch) {
        axios.post('auth/login', payload)
            .then(response => handleAuthResponse(response, dispatch))
            .catch(error => console.error(error));
    }
}

export const register = (payload) => {
    return function(dispatch) {
        axios.post('auth/register', payload)
            .then(response => handleAuthResponse(response, dispatch))
            .catch(error => console.error(error));
    }
}

export const resendVerificationMail = () => {
    axios.post('mailer', { action: 'welcome-mail' })
        .catch(error => console.log(error));
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