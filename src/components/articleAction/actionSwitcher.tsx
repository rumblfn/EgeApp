import React, { FC } from "react"
import { ArticleAction, ArticleActionTypes } from "../../types/article"
import { BoldTextArticle } from "./bold"
import { CodeArticle } from "./code"
import { HeadingArticle } from "./heading"
import { ImageArticle } from "./image"
import { ItalicTextArticle } from "./italicText"
import { QuoteArticle } from "./quote"
import { TextArticle } from "./text"

interface ActionSwitcherProps {
    action: ArticleAction;
}

const ActionSwitcher:FC<ActionSwitcherProps> = ({action}) => {
    const content = action.content

    switch (action.type) {
        case ArticleActionTypes.HEADING:
            return <HeadingArticle 
                content={content} 
                tags={action.tags}
        />
        case ArticleActionTypes.QUOTE:
            return <QuoteArticle 
                content={content} 
                tags={action.tags}
        />
        case ArticleActionTypes.IMAGE:
            return <ImageArticle content={content}/>
        case ArticleActionTypes.TEXT:
            return <TextArticle 
                content={content} 
                tags={action.tags}
        />
        case ArticleActionTypes.ITALIC_TEXT:
            return <ItalicTextArticle 
                content={content} 
                tags={action.tags}
        />
        case ArticleActionTypes.CODE_TEXT:
            return <CodeArticle
                    language={action.language}
                    content={content}
                />
        case ArticleActionTypes.BOLD_TEXT:
            return <BoldTextArticle 
                content={content} 
                tags={action.tags}
        />
        default:
            return null
    }
}

export default ActionSwitcher