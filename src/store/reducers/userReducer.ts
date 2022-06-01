import { ArticleActionTypesReducer, FetchingArticleAction } from "../../types/article"
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
    draftedArticles: [],
    articles: [],
    draftedArticlesLoading: false,
    articlesLoading: false,
    draftedArticlesError: '',
    articlesError: '',
    loading: false,
    error: null,
    draftArticlesLoaded: false,
    articlesLoaded: false
}

export const userReducer = (state = initialState, action: UserAction | FetchingArticleAction): UserState => {
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
                draftedArticles: [...state.draftedArticles, {...action.payload}]
            }
        case UserActionTypes.ADD_USER_ARTICLE_TO_PUBLISH:

            return {
                ...state,
                articles: [...state.draftedArticles, {...action.payload}]
            }
        case ArticleActionTypesReducer.FETCH_USER_ARTICLES:
            return {
                ...state,
                articlesLoading: true,
                articlesLoaded: true,
                articlesError: ''
            }
        case ArticleActionTypesReducer.FETCH_USER_ARTICLES_SUCCESS:
            return {
                ...state,
                articlesLoading: false,
                articlesError: '',
                articles: [
                    ...action.payload
                ]
            }
        case ArticleActionTypesReducer.FETCH_USER_ARTICLES_ERROR:
            return {
                ...state,
                articlesLoading: false,
                articlesError: action.payload
            }
        case ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES:
            return {
                ...state,
                articlesLoading: true,
                articlesError: '',
                draftArticlesLoaded: true,
            }
        case ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES_SUCCESS:
            return {
                ...state,
                articlesLoading: false,
                articlesError: '',
                draftedArticles: [
                    ...action.payload
                ]
            }
        case ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES_ERROR:
            return {
                ...state,
                articlesLoading: false,
                articlesError: action.payload
            }
        default:
            return state;
    }
}