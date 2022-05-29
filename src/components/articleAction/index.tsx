import { FC, useState } from "react";
import { ArticleAction, ArticleActionTypes } from "../../types/article";

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
    const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('');

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

    switch (action.type) {
        case ArticleActionTypes.HEADING:
            return (
                <div className="action-box">
                    <input 
                        onBlur={(e) => {handleText(e.target.value)}}
                        className="input-default input-heading" 
                        type="text" 
                        placeholder="Heading"
                        onChange={e => setInputValue(e.target.value)}
                        value={inputValue ? inputValue : typeof action.content === 'string' ? action.content : ''}
                    />
                    <i className="fa-solid fa-xmark action-box-rm"
                        onClick={removeAction}
                    />
                </div>
            )
        case ArticleActionTypes.QUOTE:
            return (
                <div className="action-box action-box-quote">
                    <input 
                        onBlur={(e) => {handleText(e.target.value)}}
                        className="input-default input-quote" 
                        type="text" 
                        placeholder="Some quote here"
                        onChange={e => setInputValue(e.target.value)}
                        value={inputValue ? inputValue : typeof action.content === 'string' ? action.content : ''}
                    />
                    <i className="fa-solid fa-xmark action-box-rm"
                        onClick={removeAction}
                    />
                </div>
            )
        case ArticleActionTypes.IMAGE:
            return (
                <div className="action-box">
        
                </div>
            )
        case ArticleActionTypes.LINK:
            return (
                <div>
            
                </div>
            )
        case ArticleActionTypes.TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text" onClick={() => {setAboutEditorMode(true)}}>
                        {
                            action.content ?
                                <p style={{wordBreak: 'break-all', margin: 0}}>{action.content}</p>
                                : <span style={{fontSize: 16, color: 'grey'}}>Click here to change</span>
                        }
                    </div>
                    {
                        aboutEditorMode ?
                        <div>
                            <textarea
                                className="auth-input" 
                                style={{resize: 'none', minHeight: 150}}
                                onBlur={(e) => {
                                    setAboutEditorMode(true); 
                                    handleText(e.target.value)
                                }}
                                onChange={e => setInputValue(e.target.value)}
                                defaultValue={inputValue ? inputValue : typeof action.content === 'string' ? action.content : ''}
                            />
                        </div>
                        : null
                    }
                    <i className="fa-solid fa-xmark action-box-rm"
                        onClick={removeAction}
                    />
                </div>
            )
        case ArticleActionTypes.ITALIC_TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text" onClick={() => {setAboutEditorMode(true)}}>
                        {
                            action.content ?
                                <p style={{wordBreak: 'break-all', margin: 0, fontStyle: 'italic'}}>{action.content}</p>
                                : <span style={{fontSize: 16, color: 'grey'}}>Click here to change</span>
                        }
                    </div>
                    {
                        aboutEditorMode ?
                        <div>
                            <textarea
                                className="auth-input" 
                                style={{resize: 'none', minHeight: 150}}
                                onBlur={(e) => {
                                    setAboutEditorMode(true); 
                                    handleText(e.target.value)
                                }}
                                onChange={e => setInputValue(e.target.value)}
                                defaultValue={inputValue ? inputValue : typeof action.content === 'string' ? action.content : ''}
                            />
                        </div>
                        : null
                    }
                    <i className="fa-solid fa-xmark action-box-rm"
                        onClick={removeAction}
                    />
                </div>
            )
        case ArticleActionTypes.CODE_TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text" onClick={() => {setAboutEditorMode(true)}}>
                        {
                            action.content ?
                                <pre><code>{action.content}</code></pre>
                                : <span style={{fontSize: 16, color: 'grey'}}>Click here to change</span>
                        }
                    </div>
                    {
                        aboutEditorMode ?
                        <div>
                            <textarea
                                className="auth-input" 
                                style={{resize: 'none', minHeight: 150}}
                                onBlur={(e) => {
                                    setAboutEditorMode(true); 
                                    handleText(e.target.value)
                                }}
                                onChange={e => setInputValue(e.target.value)}
                                defaultValue={inputValue ? inputValue : typeof action.content === 'string' ? action.content : ''}
                            />
                        </div>
                        : null
                    }
                    <i className="fa-solid fa-xmark action-box-rm"
                        onClick={removeAction}
                    />
                </div>
            )
        case ArticleActionTypes.BOLD_TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text" onClick={() => {setAboutEditorMode(true)}}>
                        {
                            action.content ?
                                <p style={{wordBreak: 'break-all', margin: 0}}><b>{action.content}</b></p>
                                : <span style={{fontSize: 16, color: 'grey'}}>Click here to change</span>
                        }
                    </div>
                    {
                        aboutEditorMode ?
                        <div>
                            <textarea
                                className="auth-input" 
                                style={{resize: 'none', minHeight: 150}}
                                onBlur={(e) => {
                                    setAboutEditorMode(true); 
                                    handleText(e.target.value)
                                }}
                                onChange={e => setInputValue(e.target.value)}
                                defaultValue={inputValue ? inputValue : typeof action.content === 'string' ? action.content : ''}
                            />
                        </div>
                        : null
                    }
                    <i className="fa-solid fa-xmark action-box-rm"
                        onClick={removeAction}
                    />
                </div>
            )
        case ArticleActionTypes.FORMULA:
            return (
                <div>
                        
                </div>
            )
        case ArticleActionTypes.OL_LIST:
            return (
                <div>
                            
                </div>
            )
        case ArticleActionTypes.UL_LIST:
            return (
                <div>
                                
                </div>
            )
        default:
            return (
                <div>

                </div>
            )
    }
}