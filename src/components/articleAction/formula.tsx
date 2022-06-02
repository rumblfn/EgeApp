import { FC, useState } from "react";
var Latex = require('react-latex');

interface FormulaArticleProps {
    removeAction: () => void;
    content: string | null;
    handleText: (value: string) => void;
}

export const FormulaArticle: FC<FormulaArticleProps> = ({
    content, handleText, removeAction
}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(false)

  return (
    <div className="action-box">
      <div
        className="action-box-simple-text"
        onClick={() => {
          setAboutEditorMode(true);
        }}
      >
        {content ? (
          <div>
            <Latex>{content}</Latex>
          </div>
        ) : (
          <span style={{ fontSize: 16, color: "grey" }}>
            Click here to change
          </span>
        )}
      </div>
      {aboutEditorMode ? (
        <div>
          <textarea
            placeholder="We are using Latex syntax"
            className="auth-input"
            style={{ resize: "none", minHeight: 150 }}
            onBlur={(e) => {
              setAboutEditorMode(true);
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
