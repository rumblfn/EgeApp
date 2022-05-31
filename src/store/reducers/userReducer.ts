import { UserState, UserAction, UserActionTypes } from "../../types/user"

const initialState: UserState = {
    user: {
        email: null,
        karma: null,
        login: null,
        statusUser: false,
        profileImg: null,
        profileBannerImg: null,
        status: ''
    },
    draftedArticles: {},
    articles: {},
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
            return {
                ...state,
                loading: true,
                error: null
            }
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: {...action.payload, statusUser: true}
            }
        case UserActionTypes.FETCH_USER_ERROR:
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case UserActionTypes.SET_USER_ABOUT:
            return {
                ...state,
                user: {
                    ...state.user,
                    status: action.payload,
                },
                loading: false,
                error: null
            }
        case UserActionTypes.SET_USER_IMG:
            return {
                ...state,
                user: {
                    ...state.user,
                    profileImg: action.payload
                }
            }
        case UserActionTypes.REMOVE_USER_IMG:
            return {
                ...state,
                user: {
                    ...state.user,
                    profileImg: null
                }
            }
        case UserActionTypes.ADD_USER_ARTICLE_TO_DRAFTS:
            return {
                ...state,
                draftedArticles: {
                    ...state.draftedArticles,
                    [action.payload.title]: action.payload.actions
                }
            }
        case UserActionTypes.ADD_USER_ARTICLE_TO_PUBLISH:
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [action.payload.title]: action.payload.actions
                }
            }
        default:
            return state;
    }
}