import { FC, useContext } from "react";
import { ArticleAction } from "../../types/article";
import { ArticleActionComponent } from "../ArticleAction";
import { nanoid } from "nanoid";

import './style.css';
import ArticleActionsContext from "../../routes/newArticle/context";


export const ArticleWhiteList = () => {

    const contextStore = useContext(ArticleActionsContext)
    
    if (contextStore?.actions && contextStore.saveArticle && contextStore.publishArticle)
        return (
            <div className="article-template">
                <div className="main-environment">
                    {contextStore.actions.map((action, index) => 
                        <ArticleActionComponent 
                            key={nanoid(8)}
                            index={index}
                            action={action}
                            actions={contextStore.actions}
                        />
                    )}
                </div>
                <button className="profile-image-upload-button article-template-save"
                    onClick={() => {contextStore.saveArticle(true)}}
                >
                    <span className="text">Preserve</span>
                </button>
                <button className="profile-image-upload-button article-template-publish"
                    onClick={() => {contextStore.publishArticle(true)}}
                >
                    <span className="text">Publish</span>
                </button>
            </div>
        )
    return null
}