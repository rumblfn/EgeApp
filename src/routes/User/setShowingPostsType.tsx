import { FC } from "react";
import { ArticleType } from "../../types/article";

interface SetPostsTypeProps {
    type: ArticleType;
    setType: (value: ArticleType) => void;
}

export const SetPostsType: FC<SetPostsTypeProps> = ({
    setType, type
}) => {
  return (
    <div className="profile-content-box">
      <h4 style={{ margin: 0 }}>Your posts</h4>
      <div className="select-post-type-block">
        <span
          onClick={() => {
            setType("draft");
          }}
          className={
            type === "draft"
              ? "select-post-type-block__option select-post-type-block__option_selected"
              : "select-post-type-block__option"
          }
        >
          Drafts
        </span>
        <span
          onClick={() => {
            setType("publish");
          }}
          className={
            type === "publish"
              ? "select-post-type-block__option select-post-type-block__option_selected"
              : "select-post-type-block__option"
          }
        >
          Published
        </span>
      </div>
    </div>
  );
};
