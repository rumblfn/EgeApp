export enum UserActionTypes {
    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR",
    SET_USER_ABOUT = "SET_USER_ABOUT",
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

export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction | SetUserAboutAction;