import { checkHttpStatus, parseJSON } from '../utils';
import { push } from 'vitaminjs/react-router-redux';
import jwtDecode from 'jwt-decode';

import config from '../config';

export function loginUserSuccess(token) {
    console.log('loginUserSuccess');
    localStorage.setItem('token', token);
    return {
        type: 'LOGIN_USER_SUCCESS',
        payload: {
            token: token
        }
    }
}

export function loginUserFailure(error) {
    console.log('loginUserFailure');
    localStorage.removeItem('token');
    return {
        type: 'LOGIN_USER_FAILURE',
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function loginUserRequest() {
    console.log('loginUserRequest');
    return {
        type: 'LOGIN_USER_REQUEST'
    }
}

export function logout() {
    console.log('logout');
    localStorage.removeItem('token');
    return {
        type: 'LOGOUT_USER'
    }
}

export function logoutAndRedirect() {
    console.log('logoutAndRedirect');
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/login'));
    }
}


export function loginUser(email, password, redirect="/") {
    console.log('loginUser', {email, password, redirect});
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch(config.api.auth, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                    dispatch(push(null, redirect));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}

export function receiveProtectedData(data) {
    console.log('receiveProtectedData');
    return {
        type: 'RECEIVE_PROTECTED_DATA',
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
    console.log('fetchProtectedDataRequest');
    return {
        type: 'FETCH_PROTECTED_DATA_REQUEST'
    }
}

export function fetchProtectedData(token) {
    console.log('fetchProtectedData');

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch(config.api.auth, {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.data));
            })
            .catch(error => {
                if(error.response.status === 401) {
                    dispatch(loginUserFailure(error));
                    dispatch(push('/login'));
                }
            })
    }
}