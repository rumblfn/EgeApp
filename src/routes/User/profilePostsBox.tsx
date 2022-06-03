import { nanoid } from "nanoid";
import { FC, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ArticleType, OneArticle } from "../../types/article";
import { UserState } from "../../types/user";
import { ArticlePreview } from "./postPreview";

interface PostsBoxProps {
    type: ArticleType;
    login: string;
}

export const PostsBox:FC<PostsBoxProps> = ({type, login}) => {
    const { draftedArticles, articles, articlesError, draftedArticlesError, articlesLoaded, draftArticlesLoaded,
        articlesLoading, draftedArticlesLoading} = useTypedSelector<UserState>(state => state.user)
    
    const {fetchArticles, fetchDraftedArticles} = useActions();

    useEffect(() => {
        switch (type) {
            case 'draft':
                if (!draftArticlesLoaded) {
                    fetchDraftedArticles(login);
                }
                return
            case 'publish':
                if (!articlesLoaded) {
                    fetchArticles(login)
                }
                return
            default:
                return
        }
    }, [type])

    let articlesToRender: OneArticle[] = [];
    if (type === 'draft') {
        articlesToRender = draftedArticles
    } else if (type === 'publish') {
        articlesToRender = articles
    }

    return (
        <div className="profile-content-box" style={{minHeight: 150}}>
            {articlesLoading || draftedArticlesLoading ? <p>Loading...</p> : null}
            {articlesError || draftedArticlesError ? <p>Some errors</p> : null}
            {articlesToRender.map((article: OneArticle) => 
                <ArticlePreview 
                    key={nanoid(8)}
                    id={article.id}
                    task_id={article.task_id}
                    subject_id={article.subject_id}
                    title={article.title}
                    type={article.type}
                    views={article.views}
                    starred={article.starred}
            />)}
        </div>
    )
}