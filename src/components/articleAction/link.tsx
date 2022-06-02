import { FC, useRef, useState } from "react";

interface LinkArticleProps {
    linkTitleAction: string | null;
    removeAction: () => void;
    content: string | null;
    handleText: (value: string) => void;
    handleLinkTitle: (value: string) => void;
}

export const LinkArticle: FC<LinkArticleProps> = ({
    linkTitleAction, content,
    removeAction, handleText, handleLinkTitle
}) => {
    const [linkTitle, setLinkTitle] = useState<string | null>(linkTitleAction);
    const [aboutEditorMode, setAboutEditorMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('');
    const linkInputRef = useRef<any>(null);

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
            <a style={{ color: "blue" }} href={`${content}`}>
              {linkTitleAction}
            </a>
          </div>
        ) : (
          <span style={{ fontSize: 16, color: "grey" }}>
            Click here to change
          </span>
        )}
      </div>
      {aboutEditorMode ? (
        <div>
          <input
            ref={linkInputRef}
            className="input-default"
            type="text"
            placeholder="Type your link here"
            onChange={(e) => setInputValue(e.target.value)}
            value={
              inputValue ? inputValue : content ? content : ""
            }
          />
          <input
            onBlur={(e) => {
              handleText(linkInputRef.current.value)
              handleLinkTitle(e.target.value);
            }}
            className="input-default"
            type="text"
            placeholder="Type your title for link here"
            onChange={(e) => setLinkTitle(e.target.value)}
            value={
              linkTitle ? linkTitle : linkTitleAction ? linkTitleAction : ""
            }
          />
        </div>
      ) : null}
      <i className="fa-solid fa-xmark action-box-rm" onClick={removeAction} />
    </div>
  );
};
