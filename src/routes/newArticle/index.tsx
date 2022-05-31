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
    const {addUserArticleToDrafts, addUserArticleToPublish} = useActions();

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [type, setType] = useState<ArticleType>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [articleTitle, setArticleTitle] = useState<string>('');

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
            switch (type) {
                case 'draft':
                    addUserArticleToDrafts(userLogin, articleTitle, actions);
                    navigate('/profile');
                    return
                case 'publish':
                    addUserArticleToPublish(userLogin, articleTitle, actions);
                    navigate('/profile');
                    return
                default:
                    alert('Some errors, try again')
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
            <NewArticleInstruments setActions={setActions} />
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