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