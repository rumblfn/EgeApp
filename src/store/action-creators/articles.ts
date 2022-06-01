import { ArticleActionReducer, ArticleActionTypesArticleReducer } from './../../types/article';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ArticleActionTypesReducer, FetchingArticleAction, OneArticle } from '../../types/article';

interface responseProps {
    status: boolean;
    body: OneArticle[];
}

export const fetchDraftedArticles = (login: string) => {
    return async (dispatch: Dispatch<FetchingArticleAction>) => {
        try {
            dispatch({
                type: ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES
            })
            const response = await axios.get<responseProps>(`http://localhost:8888/articles/getArticles/?login=${login}&type=draft`)
            if (response.data.status) {
                dispatch({
                    type: ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES_SUCCESS, 
                    payload: response.data.body
                })
            }
        } catch (e) {
            dispatch({
                type: ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES_ERROR, 
                payload: 'error'
            })
        }
    }
}

export const fetchArticles = (login: string) => {
    return async (dispatch: Dispatch<FetchingArticleAction>) => {
        try {
            dispatch({
                type: ArticleActionTypesReducer.FETCH_USER_ARTICLES
            })
            const response = await axios.get<responseProps>(`http://localhost:8888/articles/getArticles/?login=${login}&type=publish`)
            if (response.data.status) {
                dispatch({
                    type: ArticleActionTypesReducer.FETCH_USER_ARTICLES_SUCCESS, 
                    payload: response.data.body
                })
            }
        } catch (e) {
            dispatch({
                type: ArticleActionTypesReducer.FETCH_USER_ARTICLES_ERROR, 
                payload: 'error'
            })
        }
    }
}

export const fetchArticle = (id: string) => {
    return async (dispatch: Dispatch<ArticleActionReducer>) => {
        try {
            dispatch({
                type: ArticleActionTypesArticleReducer.FETCH_ARTICLE
            })
            const response = await axios.get<OneArticle>(`http://localhost:8888/articles/getArticle/?id=${id}`)
            if (response.data) {
                dispatch({
                    type: ArticleActionTypesArticleReducer.FETCH_ARTICLE_SUCCESS, 
                    payload: response.data
                })
            }
        } catch (e) {
            dispatch({
                type: ArticleActionTypesArticleReducer.FETCH_ARTICLE_ERROR, 
                payload: 'error'
            })
        }
    }
}