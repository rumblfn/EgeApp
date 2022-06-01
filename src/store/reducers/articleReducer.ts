import { ArticleActionReducer, ArticleState, ArticleActionTypesArticleReducer } from "../../types/article"

const initialState: ArticleState = {
    loading: false,
    error: null,
    articles: {}
}

export const articleReducer = (state = initialState, action: ArticleActionReducer) => {
    switch (action.type) {
        case ArticleActionTypesArticleReducer.FETCH_ARTICLE:
            return {
                ...state,
                loading: true,
                error: null
            }
        case ArticleActionTypesArticleReducer.FETCH_ARTICLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ArticleActionTypesArticleReducer.FETCH_ARTICLE_SUCCESS:
            if (action.payload.id) {
                return {
                    ...state,
                    loading: false,
                    articles: {
                        ...state.articles,
                        [action.payload.id]: action.payload
                    }
                }
            }
            return state
        default:
            return state
    }
}