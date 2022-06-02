import { FC, useState, useRef } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeArticleProps {
    removeAction: () => void;
    content: string | null;
    handleText: (value: string) => void;
    handleLang: (value: string) => void;
    language: string | null;
}

export const CodeArticle: FC<CodeArticleProps> = ({
    content, handleLang, language, handleText, removeAction
}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(false)
    const [lang, setLang] = useState<string | null>(language);
    const langInputRef = useRef<any>(null);

  return (
    <div className="action-box">
      <div
        className="action-box-simple-text"
        onClick={() => {
          setAboutEditorMode(true);
        }}
      >
        {content ? (
          <SyntaxHighlighter language={lang ? lang : ""} style={docco}>
            {content}
          </SyntaxHighlighter>
        ) : (
          <span style={{ fontSize: 16, color: "grey" }}>
            Click here to change
          </span>
        )}
      </div>
      {aboutEditorMode ? (
        <div>
          <input ref={langInputRef}
            className="input-default"
            type="text"
            placeholder="Type your lang here"
            onChange={(e) => setLang(e.target.value)}
            value={lang ? lang : language ? language : ""}
          />
          <textarea
            className="auth-input"
            style={{ resize: "none", minHeight: 150 }}
            onBlur={(e) => {
              setAboutEditorMode(true);
              handleLang(langInputRef.current.value);
              handleText(e.target.value);
            }}
            onChange={(e) => setInputValue(e.target.value)}
            defaultValue={
              inputValue
                ? inputValue
                : typeof content === "string"
                ? content
                : ""
            }
          />
        </div>
      ) : null}
      <i className="fa-solid fa-xmark action-box-rm" onClick={removeAction} />
    </div>
  );
};
