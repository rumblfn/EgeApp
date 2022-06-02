import { FC, useState } from "react";

interface HeadingArticleProps {
    handleText: (value: string) => void;
    content: string | null;
    removeAction: () => void;
}

export const HeadingArticle:FC<HeadingArticleProps> = ({
    handleText, content, removeAction
}) => {
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <div className="action-box">
            <input 
                onBlur={(e) => {handleText(e.target.value)}}
                className="input-default input-heading" 
                type="text" 
                placeholder="Heading"
                onChange={e => setInputValue(e.target.value)}
                value={inputValue ? inputValue : typeof content === 'string' ? content : ''}
            />
            <i className="fa-solid fa-xmark action-box-rm"
                onClick={removeAction}
            />
        </div>
    )
}