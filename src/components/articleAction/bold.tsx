import { FC, useContext } from "react";
import { DefaultTextArea } from "../DefaultTextArea";
import { Xmark } from "../Xmark";
import ArticleActionsContextHandlers from "./context";
import styles from './style.module.scss'

interface Props {
    content: string;
    tags: string[]
}

export const BoldTextArticle: FC<Props> = ({content, tags}) => {
  
    const contextStore = useContext(ArticleActionsContextHandlers)

    if (!contextStore?.handleText && !contextStore?.removeAction && !contextStore?.handleLang)
        return null

    const {handleText, removeAction} = contextStore

  return (
    <div className={styles['action-box']}>
      <DefaultTextArea 
        variant="bold" 
        content={content} 
        handleText={handleText} 
      />
      <p className={styles['tags-box']}>{tags.join(', ')}</p>
      <Xmark removeAction={removeAction} />
    </div>
  );
};
