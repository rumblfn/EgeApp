import { FC, useState } from "react";

interface QuoteArticleProps {
    handleText: (value: string) => void;
    content: string | null;
    removeAction: () => void;
}

export const QuoteArticle:FC<QuoteArticleProps> = ({
    handleText, content, removeAction
}) => {
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <div className="action-box action-box-quote">
            <input 
                onBlur={(e) => {handleText(e.target.value)}}
                className="input-default input-quote" 
                type="text" 
                placeholder="Some quote here"
                onChange={e => setInputValue(e.target.value)}
                value={inputValue ? inputValue : typeof content === 'string' ? content : ''}
            />
            <i className="fa-solid fa-xmark action-box-rm"
                onClick={removeAction}
            />
        </div>
    )
}