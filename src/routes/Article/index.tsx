import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { ArticleAction } from "../../types/article";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const ArticlePage:FC = () => {
    const params = useParams();
    const id = params.id || '';

    const article = useTypedSelector((state: any) => state.article.articles[id]);
    const {fetchArticle} = useActions();
    const [actions, setActions] = useState<ArticleAction[]>([]);

    useEffect(() => {
        if (!article) {
            fetchArticle(id)
        } else {
            setActions(JSON.parse(article.actions))
        }
    }, [])

    useEffect(() => {
        console.log(actions)
    }, [actions])

    return (
        <div>

        </div>
    )
}