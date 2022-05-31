import { FC, useState, useRef } from "react";
import { ArticleAction, ArticleActionTypes } from "../../types/article";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import encodeImageFileAsURL from "../static/encodeImageFileAsURL";
import './style.css';

var Latex = require('react-latex');

interface Props {
    index: number;
    action: ArticleAction;
    actions: ArticleAction[];
    setActions: (newState: ArticleAction[] | 
        ((prevState: ArticleAction[]) 
            => ArticleAction[])) 
    => void;
}

export const checkFileTypeAndSize = (e: any, type: string) => {
    let file = e.target.files[0];
    if (file.size > 10000000) {
        alert('Вес файла больше 10мб');
        return false;
    }
    if (file.type.split('/')[0] !== type) {
        alert('Неверный тип файла');
        return false;
    }
    return true;
}

export const ArticleActionComponent:FC<Props> = ({action, actions, setActions, index}) => {
    const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('');
    const [lang, setLang] = useState<string | null>(action.language);
    const [linkTitle, setLinkTitle] = useState<string | null>(action.linkTitle);

    const [imageData, setImageData] = useState<string | boolean>(`${action.content}`);
    const imageUploadedRef = useRef(null);

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

    const handleUploadedFileImage = (e: any) => {
        if (!e.target.files.length) {
            return
        }
        const check = checkFileTypeAndSize(e, 'image');
        if (check) {
            encodeImageFileAsURL(e, setImageDataFull);
        }
    }

    const setImageDataFull = (data: string) => {
        setImageData(data)
        handleText(data)
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
                <div className="action-box" style={{marginTop: 16}}>
                    <input id="file-upload" type="file" className="file-uploader"
                        onChange={e => {handleUploadedFileImage(e)}}/>
                    {imageData ? 
                    <div className='audio-player-container'>
                        <img ref={imageUploadedRef} 
                            style={{maxWidth: '100%', marginTop: 16, maxHeight: '60vh'}}
                            className='player-container__content' 
                            src={typeof imageData === 'boolean' ? '' : imageData} alt="картинка"
                        />
                    </div>
                    : null}
                    <i className="fa-solid fa-xmark action-box-rm"
                        onClick={removeAction}
                    />
                </div>
            )
        case ArticleActionTypes.LINK:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text" onClick={() => {setAboutEditorMode(true)}}>
                        {
                            action.content ?
                                <div>
                                    <a style={{color: 'blue'}} href={`${action.content}`}>{action.linkTitle}</a>
                                </div>
                                : <span style={{fontSize: 16, color: 'grey'}}>Click here to change</span>
                        }
                    </div>
                    {
                        aboutEditorMode ?
                        <div>
                            <input
                                onBlur={(e) => {
                                    handleText(e.target.value)
                                }}
                                className="input-default" 
                                type="text" 
                                placeholder="Type your link here"
                                onChange={e => setInputValue(e.target.value)}
                                value={inputValue ? inputValue : action.content ? action.content : ''}
                            />
                            <input
                                onBlur={(e) => {
                                    handleLinkTitle(e.target.value)
                                }}
                                className="input-default" 
                                type="text" 
                                placeholder="Type your title for link here"
                                onChange={e => setLinkTitle(e.target.value)}
                                value={linkTitle ? linkTitle : action.linkTitle ? action.linkTitle : ''}
                            />
                        </div>
                        : null
                    }
                    <i className="fa-solid fa-xmark action-box-rm"
                        onClick={removeAction}
                    />
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
                                <SyntaxHighlighter language={lang ? lang : ''} style={docco}>
                                    {action.content}
                                </SyntaxHighlighter>
                                : <span style={{fontSize: 16, color: 'grey'}}>Click here to change</span>
                        }
                    </div>
                    {
                        aboutEditorMode ?
                        <div>
                            <input
                                onBlur={(e) => {
                                    handleLang(e.target.value)
                                }}
                                className="input-default" 
                                type="text" 
                                placeholder="Type your lang here"
                                onChange={e => setLang(e.target.value)}
                                value={lang ? lang : action.language ? action.language : ''}
                            />
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
                <div className="action-box">
                    <div className="action-box-simple-text" onClick={() => {setAboutEditorMode(true)}}>
                        {
                            action.content ?
                                <div>
                                    <Latex>{action.content}</Latex>
                                </div>
                            : <span style={{fontSize: 16, color: 'grey'}}>Click here to change</span>
                        }
                    </div>
                    {
                        aboutEditorMode ?
                        <div>
                            <textarea
                                placeholder="We are using Latex syntax"
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
        case ArticleActionTypes.PRE_TEXT:
            return (
                <div className="action-box">
                    <div className="action-box-simple-text" onClick={() => {setAboutEditorMode(true)}}>
                        {
                            action.content ?
                                <pre>
                                    {action.content}
                                </pre>
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
        default:
            return (
                <div>

                </div>
            )
    }
}