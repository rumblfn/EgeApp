import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { ArticleAction } from "../../types/article";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ArticleActionTypes } from "../../types/article";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { nanoid } from "nanoid";

var Latex = require('react-latex');

export const ArticlePage:FC = () => {
    const params = useParams();
    const id = params.id || '';

    const article = useTypedSelector((state: any) => state.article.articles[id]);
    const {fetchArticle} = useActions();
    const [actions, setActions] = useState<ArticleAction[]>([]);

    useEffect(() => {
        if (!article) {
            fetchArticle(id)
        } else {
            setActions(JSON.parse(article.actions))
        }
    }, [article])

    return (
        <div style={{margin: 64, backgroundColor: 'white', borderRadius: 12}}>
            {actions.map((action) => 
                <ActionComponent 
                    key={nanoid(8)}
                    action={action}
                />
            )}
        </div>
    )
}

interface ActionComponentProps {
    action: ArticleAction;
}

const ActionComponent:FC<ActionComponentProps> = ({action}) => {
    switch (action.type) {
        case ArticleActionTypes.HEADING:
            return (
                <div className="action-box">
                    <h2 className="input-default input-heading">{action.content}</h2>
                </div>
            )
        case ArticleActionTypes.QUOTE:
            return (
                <div className="action-box action-box-quote">
                    <span className="input-default input-quote">{action.content}</span>
                </div>
            )
        case ArticleActionTypes.IMAGE:
            return (
                <div className="action-box" style={{marginTop: 16}}>
                    <div className='audio-player-container'>
                        <img style={{maxWidth: '100%', marginTop: 16, maxHeight: '60vh'}}
                            className='player-container__content' 
                            src={action.content ? action.content : ''} alt="картинка"
                        />
                    </div>
                </div>
            )
        case ArticleActionTypes.LINK:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text">
                        <div>
                            <a style={{color: 'blue'}} href={`${action.content}`}>{action.linkTitle}</a>
                        </div>
                    </div>
                </div>
            )
        case ArticleActionTypes.TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text">
                        <p style={{wordBreak: 'break-all', margin: 0}}>{action.content}</p>
                    </div>
                </div>
            )
        case ArticleActionTypes.ITALIC_TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text">
                        <p style={{wordBreak: 'break-all', margin: 0, fontStyle: 'italic'}}>{action.content}</p>
                    </div>
                </div>
            )
        case ArticleActionTypes.CODE_TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text">
                        <SyntaxHighlighter language={action.language ? action.language : ''} style={docco}>
                            {typeof action.content === 'string' ? action.content : ''}
                        </SyntaxHighlighter>
                    </div>
                </div>
            )
        case ArticleActionTypes.BOLD_TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text">
                        <p style={{wordBreak: 'break-all', margin: 0}}><b>{action.content}</b></p>
                    </div>
                </div>
            )
        case ArticleActionTypes.FORMULA:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text">
                        <div>
                            <Latex>{action.content}</Latex>
                        </div>
                    </div>
                </div>
            )
        case ArticleActionTypes.PRE_TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text">
                        <pre>
                            {action.content}
                        </pre>
                    </div>
                </div>
            )
        default:
            return (
                <div>

                </div>
            )
    }
}