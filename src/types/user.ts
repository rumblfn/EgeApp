import { ArticleAction } from './article';

export enum UserActionTypes {
    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR",
    SET_USER_ABOUT = "SET_USER_ABOUT",
    SET_USER_IMG  = 'SET_USER_IMG',
    REMOVE_USER_IMG = "REMOVE_USER_IMG",
    ADD_USER_ARTICLE_TO_DRAFTS = "ADD_USER_ARTICLE_TO_DRAFTS",
    ADD_USER_ARTICLE_TO_PUBLISH = "ADD_USER_ARTICLE_TO_PUBLISH"
}

export interface UserUserState {
    email: null | string;
    karma: null | string;
    login: null | string;
    statusUser: null | boolean | string;
    profileImg: string | null;
    profileBannerImg: string | null;
    status: string;
}

export interface UserState {
    user: UserUserState;
    draftedArticles: {};
    articles: {};
    loading: boolean;
    error: null | string;
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS;
    payload: UserUserState;
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string;
}

export interface SetUserAboutAction {
    type: UserActionTypes.SET_USER_ABOUT;
    payload: string;
}

export interface SetUserImgAction {
    type: UserActionTypes.SET_USER_IMG;
    payload: string;
}

export interface RemoveUserImgAction {
    type: UserActionTypes.REMOVE_USER_IMG;
}

export interface addUserArticleToDraftsAction {
    type: UserActionTypes.ADD_USER_ARTICLE_TO_DRAFTS;
    payload: {
        title: string,
        actions: ArticleAction[]
    }
}

export interface addUserArticleToPublishAction {
    type: UserActionTypes.ADD_USER_ARTICLE_TO_PUBLISH;
    payload: {
        title: string,
        actions: ArticleAction[]
    }
}

export type UserAction = FetchUserAction | FetchUserSuccessAction | 
    FetchUserErrorAction | SetUserAboutAction | SetUserImgAction | 
    RemoveUserImgAction | addUserArticleToDraftsAction | addUserArticleToPublishAction;