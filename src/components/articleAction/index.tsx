import { FC } from "react";
import { ArticleAction, ArticleActionTypes } from "../../types/article";
import { HeadingArticle } from "./heading";
import { QuoteArticle } from "./quote";
import { ImageArticle } from "./image";
import { LinkArticle } from "./link";
import { TextArticle } from "./text";
import { ItalicTextArticle } from "./italicText";
import { CodeArticle } from "./code";
import { BoldTextArticle } from "./bold";
import { FormulaArticle } from "./formula";
import { PreTextArticle } from "./preText";
import './style.css';

interface Props {
    index: number;
    action: ArticleAction;
    actions: ArticleAction[];
    setActions: (newState: ArticleAction[] | 
        ((prevState: ArticleAction[]) 
            => ArticleAction[])) 
    => void;
}

export const ArticleActionComponent:FC<Props> = ({action, actions, setActions, index}) => {

    const removeAction = () => {
        setActions([
            ...actions.slice(0, index),
            ...actions.slice(index + 1, actions.length),
        ])
    }

    const handleText = (text: string) => {
        const currentAction = actions[index]
        currentAction.content = text;

        setActions([
            ...actions.slice(0, index),
            currentAction,
            ...actions.slice(index + 1, actions.length),
        ])
    }

    const handleLang = (text: string) => {
        const currentAction = actions[index]
        currentAction.language = text;

        setActions([
            ...actions.slice(0, index),
            currentAction,
            ...actions.slice(index + 1, actions.length),
        ])
    }

    const handleLinkTitle = (linkTitle: string) => {
        const currentAction = actions[index]
        currentAction.linkTitle = linkTitle;

        setActions([
            ...actions.slice(0, index),
            currentAction,
            ...actions.slice(index + 1, actions.length),
        ])
    }

    switch (action.type) {
        case ArticleActionTypes.HEADING:
            return (
                <HeadingArticle 
                    content={action.content}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
        case ArticleActionTypes.QUOTE:
            return (
                <QuoteArticle 
                    content={action.content}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
        case ArticleActionTypes.IMAGE:
            return (
                <ImageArticle 
                    content={action.content ? action.content : ''}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
        case ArticleActionTypes.LINK:
            return (
                <LinkArticle
                    content={action.content ? action.content : ''}
                    handleText={handleText}
                    removeAction={removeAction}
                    handleLinkTitle={handleLinkTitle}
                    linkTitleAction={action.linkTitle}
                />
            )
        case ArticleActionTypes.TEXT:
            return (
                <TextArticle
                    content={action.content ? action.content : ''}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
        case ArticleActionTypes.ITALIC_TEXT:
            return (
                <ItalicTextArticle
                    content={action.content ? action.content : ''}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
        case ArticleActionTypes.CODE_TEXT:
            return (
                <CodeArticle 
                    handleLang={handleLang}
                    language={action.language}
                    content={action.content ? action.content : ''}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
        case ArticleActionTypes.BOLD_TEXT:
            return (
                <BoldTextArticle
                    content={action.content ? action.content : ''}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
        case ArticleActionTypes.FORMULA:
            return (
                <FormulaArticle
                    content={action.content ? action.content : ''}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
        case ArticleActionTypes.PRE_TEXT:
            return (
                <PreTextArticle
                    content={typeof action.content === 'string' ? action.content : ''}
                    handleText={handleText}
                    removeAction={removeAction}
                />
            )
    }
}