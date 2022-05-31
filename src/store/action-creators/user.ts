import { ArticleAction } from './../../types/article';
import { Dispatch } from 'redux';
import { UserAction, SetUserAboutAction, 
    SetUserImgAction, RemoveUserImgAction,
    addUserArticleToDraftsAction, addUserArticleToPublishAction 
} from '../../types/user';
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

export const setUserImgStore = (login: string, text: string) => {
    return async (dispatch: Dispatch<SetUserImgAction>) => {
        try {
            const response = await axios.post(`http://localhost:8888/user/editImg`, {
                login,
                text
            })
            if (response.data.status) {
                dispatch({
                    type: UserActionTypes.SET_USER_IMG, 
                    payload: text
                })
            }
        } catch (e) {
            throw console.error('errors on changing status, try later');
        }
    }
}

export const removeUserImgStore = (login: string) => {
    return async (dispatch: Dispatch<RemoveUserImgAction>) => {
        try {
            const response = await axios.post(`http://localhost:8888/user/removeImg`, {
                login
            })
            if (response.data.status) {
                dispatch({
                    type: UserActionTypes.REMOVE_USER_IMG, 
                    payload: null
                })
            }
        } catch (e) {
            throw console.error('errors on changing status, try later');
        }
    }
}

export const addUserArticleToDrafts = (login: string, title: string, actions: ArticleAction[]) => {
    return async (dispatch: Dispatch<addUserArticleToDraftsAction>) => {
        try {
            dispatch({
                type: UserActionTypes.ADD_USER_ARTICLE_TO_DRAFTS, 
                payload: {
                    title,
                    actions
                }
            })
        } catch (e) {
            throw console.error('errors on changing status, try later');
        }
    }
}

export const addUserArticleToPublish = (login: string, title: string, actions: ArticleAction[]) => {
    return async (dispatch: Dispatch<addUserArticleToPublishAction>) => {
        try {
            dispatch({
                type: UserActionTypes.ADD_USER_ARTICLE_TO_PUBLISH, 
                payload: {
                    title,
                    actions
                }
            })
        } catch (e) {
            throw console.error('errors on changing status, try later');
        }
    }
}