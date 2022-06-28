import { FC, useEffect, useState } from "react";
import styles from './style.module.scss'

interface DefaultTextAreaProps {
    content: string;
    handleText: (value: string) => void;
    variant: string;
}

export const DefaultTextArea:FC<DefaultTextAreaProps> = ({
    content, handleText, variant
}) => {
    const [inputValue, setInputValue] = useState<string>(content);

    const matchHashTags = (text: string) => {
        let string = text;
        let regex = /#(\w*[0-9a-zA-Zа-яA-Я]+\w*[0-9a-zA-Zа-яA-Я])/gi;
        let matches = string.match(regex);
        if (matches) {
            for (let match of matches) {
                string = string.replace(match, `<span style="color: blue">${ match }</span>`)
            }
        }
        setInputValue(string)
    }

    useEffect(() => {
        matchHashTags(content)
    }, [content])

    return (
        <pre style={{wordBreak: 'break-all'}}>
            <div contentEditable
            className={styles[variant]} 
            onBlur={e => {
                handleText(e.target.innerText)
                setInputValue(e.target.innerText)
            }} 
            dangerouslySetInnerHTML={{
                __html: inputValue ? inputValue : variant
        }}/>
        </pre>
    )
}