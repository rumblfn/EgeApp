import { FC, useState } from "react"
import { NewArticleInstruments } from "../../components/newArticleInstruments"
import { ArticleWhiteList } from "../../components/articleWhiteList"
import { ArticleAction, ArticleActionTypes } from "../../types/article";

export const NewArticlePage:FC = () => {
    const [actions, setActions] = useState<ArticleAction[]>([
        {
            type: ArticleActionTypes.HEADING,
            content: ''
        }
    ]);

    return (
        <div style={{minHeight: '100vh'}}>
            <NewArticleInstruments setActions={setActions} />
            <ArticleWhiteList setActions={setActions} actions={actions}/>
        </div>
    )
}