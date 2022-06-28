import { FC, useContext } from "react";
import { DefaultTextArea } from "../DefaultTextArea";
import { Xmark } from "../Xmark";
import NoteActionsContextHandlers from "./context";
import styles from './style.module.scss'

interface Props {
    content: string;
    tags: string[]
}

export const HeadingArticle:FC<Props> = ({content, tags}) => {
    const contextStore = useContext(NoteActionsContextHandlers)

    if (!contextStore?.handleText && !contextStore?.removeAction && !contextStore?.handleLang)
        return null

    const {handleText, removeAction} = contextStore

    return (
        <div className={styles["action-box"]}>
            <DefaultTextArea 
                variant="heading" 
                content={content} 
                handleText={handleText}
            />
            <p style={{top: -26}} 
                className={styles['tags-box']}
            >{tags.join('10, ')}
            </p>
            <Xmark removeAction={removeAction} />
        </div>
    )
}