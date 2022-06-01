export interface ArticleState {
    articles: {};
    loading: boolean;
    error: null | string;
}

export enum ArticleActionTypes {
    HEADING = 'HEADING',
    QUOTE = 'QUOTE',
    IMAGE = 'IMAGE',
    LINK = 'LINK',
    TEXT = 'TEXT',
    ITALIC_TEXT = 'ITALIC_TEXT',
    CODE_TEXT = 'CODE_TEXT',
    BOLD_TEXT = 'BOLD_TEXT',
    FORMULA = 'FORMULA',
    PRE_TEXT = 'PRE_TEXT'
}

export enum ArticleActionTypesReducer {
    FETCH_DRAFT_USER_ARTICLES = "FETCH_DRAFT_USER_ARTICLES",
    FETCH_DRAFT_USER_ARTICLES_SUCCESS = "FETCH_DRAFT_USER_ARTICLES_SUCCESS",
    FETCH_DRAFT_USER_ARTICLES_ERROR = "FETCH_DRAFT_USER_ARTICLES_ERROR",
    FETCH_USER_ARTICLES = "FETCH_USER_ARTICLES",
    FETCH_USER_ARTICLES_SUCCESS = "FETCH_USER_ARTICLES_SUCCESS",
    FETCH_USER_ARTICLES_ERROR = "FETCH_USER_ARTICLES_ERROR",
}

export enum ArticleActionTypesArticleReducer {
    FETCH_ARTICLE = "FETCH_ARTICLE",
    FETCH_ARTICLE_SUCCESS = "FETCH_ARTICLE_SUCCESS",
    FETCH_ARTICLE_ERROR = "FETCH_ARTICLE_ERROR",
}

export interface FetchArticleAction {
    type: ArticleActionTypesArticleReducer.FETCH_ARTICLE
}

export interface FetchArticleSuccessAction {
    type: ArticleActionTypesArticleReducer.FETCH_ARTICLE_SUCCESS;
    payload: OneArticle;
}

export interface FetchArticleErrorAction {
    type: ArticleActionTypesArticleReducer.FETCH_ARTICLE_ERROR;
    payload: string;
}

export interface FetchUserArticlesAction {
    type: ArticleActionTypesReducer.FETCH_USER_ARTICLES
}

export interface FetchUserArticlesSuccessAction {
    type: ArticleActionTypesReducer.FETCH_USER_ARTICLES_SUCCESS;
    payload: OneArticle[];
}

export interface FetchUserArticlesErrorAction {
    type: ArticleActionTypesReducer.FETCH_USER_ARTICLES_ERROR;
    payload: string;
}

export interface FetchUserDraftArticlesAction {
    type: ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES
}

export interface FetchUserDraftArticlesSuccessAction {
    type: ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES_SUCCESS;
    payload: OneArticle[];
}

export interface FetchUserDraftArticlesErrorAction {
    type: ArticleActionTypesReducer.FETCH_DRAFT_USER_ARTICLES_ERROR;
    payload: string;
}

export type FetchingArticleAction = 
    FetchUserArticlesAction | 
    FetchUserArticlesSuccessAction |
    FetchUserArticlesErrorAction |
    FetchUserDraftArticlesAction |
    FetchUserDraftArticlesSuccessAction |
    FetchUserDraftArticlesErrorAction;

export interface HeadingAction {
    type: ArticleActionTypes.HEADING;
    content: string | null;
    language: null;
    linkTitle: string | null;
}

export interface QuoteAction {
    type: ArticleActionTypes.QUOTE;
    content: string | null;
    language: null;
    linkTitle: string | null;
}

export interface ImageAction {
    type: ArticleActionTypes.IMAGE;
    content: string | null;
    language: null;
    linkTitle: string | null;
}

export interface LinkAction {
    type: ArticleActionTypes.LINK;
    linkTitle: string | null;
    content: string | null;
    language: null;
}

export interface TextAction {
    type: ArticleActionTypes.TEXT;
    content: string | null;
    language: null;
    linkTitle: string | null;
}

export interface ItalicTextAction {
    type: ArticleActionTypes.ITALIC_TEXT;
    content: string | null;
    language: null;
    linkTitle: string | null;
}

export interface CodeTextAction {
    type: ArticleActionTypes.CODE_TEXT;
    language: string | null;
    content: string | null;
    linkTitle: string | null;
}

export interface BoldTextAction {
    type: ArticleActionTypes.BOLD_TEXT;
    content: string | null;
    language: null;
    linkTitle: string | null;
}

export interface FormulaAction {
    type: ArticleActionTypes.FORMULA;
    content: string | null;
    language: null;
    linkTitle: string | null;
}

export interface PreTextAction {
    type: ArticleActionTypes.PRE_TEXT;
    content: string[] | null;
    language: null;
    linkTitle: string | null;
}

export type ArticleAction = 
    HeadingAction | 
    QuoteAction | 
    ImageAction | 
    LinkAction |
    TextAction |
    ItalicTextAction |
    CodeTextAction |
    BoldTextAction |
    FormulaAction |
    PreTextAction;

export type ArticleType = 'draft' | null | 'publish';

export type ArticleActionReducer = FetchArticleAction | FetchArticleSuccessAction | FetchArticleErrorAction;

export interface OneArticle {
    id?: number;
    userId?: number;
    title: string;
    type: ArticleType;
    views: number;
    starred: number;
    actions?: ArticleAction[];
    subject_id: number;
    task_id: number;
}