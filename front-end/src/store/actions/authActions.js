import jwt_decode from 'jwt-decode';
import axios from '../../helpers/axios';
import { AUTHORIZE } from '../actionTypes';

export const login = (payload) => {
    return function(dispatch) {
        axios.post('auth/login', payload)
            .then(response => {
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
            })
            .catch(error => console.error(error));
    }
}