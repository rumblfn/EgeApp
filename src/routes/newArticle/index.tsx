import { FC, useEffect, useState } from "react"
import { NewArticleInstruments } from "../../components/newArticleInstruments"
import { ArticleWhiteList } from "../../components/articleWhiteList"
import { ArticleAction, ArticleActionTypes } from "../../types/article";
import { ModalWithInput } from "../../components/modalWithInput";
import { ArticleType } from "../../types/article";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";

export const NewArticlePage:FC = () => {
    const navigate = useNavigate();
    const userLogin = useTypedSelector<string | null>(state => state.user.user.login);
    const {addUserArticle} = useActions();

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [type, setType] = useState<ArticleType>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [articleTitle, setArticleTitle] = useState<string>('');

    const [subjectId, setSubjectId] = useState<number>(1);
    const [taskNumber, setTaskNumber] = useState<number>(1);

    const [actions, setActions] = useState<ArticleAction[]>([
        {
            type: ArticleActionTypes.HEADING,
            content: '',
            language: null,
            linkTitle: null
        }
    ]);

    useEffect(() => {
        if (submitted && userLogin) {
            if (type) {
                addUserArticle(userLogin, articleTitle, actions, subjectId, taskNumber, type);
                navigate('/profile');
            } else {
                alert('Selected type is null')
            }
        }
    }, [submitted, type])

    const saveArticleToDrafts = () => {
        setType('draft');
        setModalActive(true);
    }

    const publishArticle = () => {
        setType('publish');
        setModalActive(true);
    }

    return (
        <div style={{minHeight: '100vh'}}>
            <NewArticleInstruments 
                setActions={setActions} 
                setSubjectId={setSubjectId}
                setTaskNumber={setTaskNumber}
                subjectId={subjectId}
            />
            <ArticleWhiteList 
                publishArticle={publishArticle}
                saveArticleToDrafts={saveArticleToDrafts} 
                setActions={setActions} 
                actions={actions}
            />
            {
                modalActive ?
                    <ModalWithInput type={type}
                        setTitle={setArticleTitle}
                        setActive={setModalActive} 
                        setSubmitted={setSubmitted}
                    />
                : null
            }
        </div>
    )
}