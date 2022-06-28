import { FC, useEffect, useState } from "react";
import styles from './style.module.scss'

interface DefaultTextAreaProps {
    content: string;
    handleText: (value: string) => void;
    variant: string;
}

export const DefaultCodeTextArea:FC<DefaultTextAreaProps> = ({
    content, handleText, variant
}) => {
    const [inputValue, setInputValue] = useState<string>(content);

    return (
        <textarea 
            className={styles[variant]}
            onBlur={(e) => {
                handleText(e.target.value)
            }}
            placeholder={variant}
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
        />
    )
}