import { FC, useContext, useState } from "react";
import { useComboboxControls } from "react-datalist-input";
import { DataList } from "../DataListInput";
import { DefaultCodeTextArea } from "../DefaultTextArea/code";
import { Button } from "../articleWhiteList/Button";
import { SyntaxCode } from "../SyntaxCode";
import { Xmark } from "../Xmark";
import { ClearInput } from "../Xmark/clearInput";
import styles from "./style.module.scss";
import ArticleActionsContextHandlers from "./context";

interface Props {
  content: string;
  language: string;
}

export const CodeArticle: FC<Props> = ({content,language}) => {
  const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(true);

  const { setValue, value } = useComboboxControls({
    initialValue: language,
    isExpanded: true,
  });

  const contextStore = useContext(ArticleActionsContextHandlers)

  if (!contextStore?.handleText && !contextStore?.removeAction && !contextStore?.handleLang)
      return null

  const {handleText, removeAction, handleLang} = contextStore

  return (
    <div className={styles["action-box"]}>
      {aboutEditorMode ? 
        <DefaultCodeTextArea 
          handleText={handleText}
          content={content}
          variant='code'
        />
      : <SyntaxCode 
          content={content} 
          setValue={setAboutEditorMode} 
          value={value} 
      />}
      {aboutEditorMode && (
        <div className={styles["data-list-input-box"]}>
          <DataList 
            setValue={handleLang} 
            value={value} 
          />
          <ClearInput setValue={setValue}/>
        </div>
      )}
      {aboutEditorMode && 
        <Button 
          valueToSet={false}
          handler={setAboutEditorMode}
          text='submit'
          variant="small"
        />
      }
      <Xmark removeAction={removeAction} />
    </div>
  );
};
