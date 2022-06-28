import { FC, useContext, useState } from "react";
import { DefaultTextArea } from "../DefaultTextArea";
import { Xmark } from "../Xmark";
import NoteActionsContextHandlers from "./context";
import styles from './style.module.scss'

interface Props {
    content: string;
    tags: string[]
}

export const ItalicTextArticle:FC<Props> = ({
    content, tags
}) => {
    const contextStore = useContext(NoteActionsContextHandlers)

    if (!contextStore?.handleText && !contextStore?.removeAction && !contextStore?.handleLang)
        return null

    const {handleText, removeAction} = contextStore

    return (
        <div className={styles["action-box"]}>
            <DefaultTextArea 
                handleText={handleText}
                content={content}
                variant='italic'
            />
            <p className={styles['tags-box']}>{tags.join(', ')}</p>
            <Xmark removeAction={removeAction} />
        </div>
    )
}