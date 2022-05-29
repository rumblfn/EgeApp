import { FC } from "react";
import { ArticleAction } from "../../types/article";
import { ArticleActionComponent } from "../articleAction";
import { nanoid } from "nanoid";

import './style.css';

interface Props {
    actions: ArticleAction[];
    setActions: (newState: ArticleAction[] | 
        ((prevState: ArticleAction[]) 
            => ArticleAction[])) 
    => void;
}

export const ArticleWhiteList:FC<Props> = ({actions, setActions}) => {
    
    return (
        <div className="article-template">
            <div className="main-environment">
                {actions.map(
                    (action, index) => 
                        <ArticleActionComponent 
                            key={nanoid(8)}
                            index={index}
                            action={action}
                            actions={actions}
                            setActions={setActions}
                        />
                )}
            </div>
            <button className="profile-image-upload-button article-template-save">
                <span className="text">Preserve</span>
            </button>
            <button className="profile-image-upload-button article-template-publish">
                <span className="text">Publish</span>
            </button>
        </div>
    )
}