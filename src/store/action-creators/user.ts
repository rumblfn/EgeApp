import { Dispatch } from 'redux';
import { UserAction, SetUserAboutAction } from '../../types/user';
import { UserActionTypes } from '../../types/user';

import axios from 'axios';


export const setUser = (loginValue: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: UserActionTypes.FETCH_USER
            })
            const response = await axios.post(`http://localhost:8888/auth/login`, {
                login: loginValue,
                password: password
            })
            dispatch({
                type: UserActionTypes.FETCH_USER_SUCCESS, 
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR, 
                payload: 'error'
            })
        }
    }
}

export const setUserAbout = (login: string, text: string) => {
    return async (dispatch: Dispatch<SetUserAboutAction>) => {
        try {
            const response = await axios.post(`http://localhost:8888/user/editAbout`, {
                login,
                text
            })
            if (response.data.status) {
                dispatch({
                    type: UserActionTypes.SET_USER_ABOUT, 
                    payload: text
                })
            }
        } catch (e) {
            throw console.error('errors on changing status, try later');
        }
    }
}