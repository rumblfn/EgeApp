import { FC, useState } from "react";

interface ItalicTextArticleProps {
    removeAction: () => void;
    content: string | null;
    handleText: (value: string) => void;
}

export const ItalicTextArticle:FC<ItalicTextArticleProps> = ({
    content, handleText, removeAction
}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(false)

    return (
        <div className="action-box">
            <div className="action-box-simple-text" onClick={() => {setAboutEditorMode(true)}}>
            {content ?
                <p style={{wordBreak: 'break-all', margin: 0, fontStyle: 'italic'}}>{content}</p>
                : <span style={{fontSize: 16, color: 'grey'}}>Click here to change</span>
            }
            </div>
            {aboutEditorMode ?
                <div>
                    <textarea
                        className="auth-input" 
                        style={{resize: 'none', minHeight: 150}}
                        onBlur={(e) => {
                            setAboutEditorMode(true); 
                            handleText(e.target.value)
                        }}
                        onChange={e => setInputValue(e.target.value)}
                        defaultValue={inputValue ? inputValue : typeof content === 'string' ? content : ''}
                    />
                </div>
            : null}
            <i className="fa-solid fa-xmark action-box-rm"
                onClick={removeAction}
            />
        </div>
    )
}