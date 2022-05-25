import { Dispatch } from 'redux';
import { UserAction } from '../../types/user';
import { UserActionTypes, UserUserState } from '../../types/user';
import axios from 'axios';


export const setUser = (loginValue: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: UserActionTypes.FETCH_USER
            })
            const response = await axios.post(`http://192.168.1.61:8888/auth/login`, {
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
