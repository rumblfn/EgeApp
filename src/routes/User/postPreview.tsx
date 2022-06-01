import { FC } from "react";
import { OneArticle } from "../../types/article";
import { getRandomInt } from "../../components/static/mathRandom";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const ArticlePreview:FC<OneArticle> = ({
    title, views, starred, task_id, subject_id, id
}) => {
    const {subjects} = useTypedSelector(state => state.subjects)
    const subjectTitle = subjects.filter(i => { return i.id == subject_id })[0]?.title

    return (
        <Link to={`/article/${id}`} style={{fontSize: 22, fontWeight: 500, margin: 10}} 
            className={`article-profile-preview header-link link-with-hover link-with-hover${getRandomInt(5)}`}>
            <span style={{color: 'black'}}>{subjectTitle}</span>
            <span style={{color: 'black'}}>{task_id}</span>
            <h5>{title}</h5>
            <span>views: {views}</span>
            <span>stars: {starred}</span>
        </Link>
    )
}