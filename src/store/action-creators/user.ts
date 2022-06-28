import { ArticleAction, ArticleType } from './../../types/article';
import { Dispatch } from 'redux';
import { UserAction, SetUserAboutAction, 
    SetUserImgAction, RemoveUserImgAction,
    addUserArticleAction 
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

export const addUserArticle = (
    login: string, title: string, 
    actions: ArticleAction[], 
    subject_id: number, task_id: number, 
    type: ArticleType, tags: string[]
) => {
    return async (dispatch: Dispatch<addUserArticleAction>) => {
        try {
            const response = await axios.post(`http://localhost:8888/articles/addArticle`, {
                login, title, subject_id, task_id, type,
                actions: JSON.stringify(actions), tags
            })

            if (response.data.status) {
                let current_type = UserActionTypes.ADD_USER_ARTICLE_TO_PUBLISH;

                if (type === 'draft') {
                    current_type = UserActionTypes.ADD_USER_ARTICLE_TO_DRAFTS
                }

                dispatch({
                    type: current_type, 
                    payload: {
                        id: response.data.article_id, views: 0, starred: 0,
                        title, actions, subject_id, task_id, type, userId: response.data.user_id, 
                        tags
                    }
                })
            }
        } catch (e) {
            throw console.error('errors on changing status, try later');
        }
    }
}