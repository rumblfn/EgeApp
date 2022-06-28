import { FC, useEffect, useState } from "react"
import { NewArticleInstruments } from "../../components/newArticleInstruments"
import { ArticleWhiteList } from "../../components/articleWhiteList"
import { ArticleAction, ArticleActionTypes } from "../../types/article";
import { ModalWithInput } from "../../components/modalWithInput";
import { ArticleType } from "../../types/article";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import ArticleActionsContext from "./context";

interface NewArticleProps {
    actions: ArticleAction[];
    setActions: (newState: ArticleAction[] | 
        ((prevState: ArticleAction[]) 
            => ArticleAction[])) 
    => void
}


export const NewArticlePage:FC<NewArticleProps> = ({
    actions, setActions
}) => {
    const navigate = useNavigate();
    const userLogin = useTypedSelector<string | null>(state => state.user.user.login);
    const {addUserArticle} = useActions();

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [type, setType] = useState<ArticleType>(null);
    const [articleTitle, setArticleTitle] = useState<string>('');

    const [subjectId, setSubjectId] = useState<number>(1);
    const [taskNumber, setTaskNumber] = useState<number>(1);

    const saveArticle = () => {
        setType('draft');
        setModalActive(true);
    }

    const publishArticle = () => {
        setType('publish');
        setModalActive(true);
    }

    const publish = (tags: string[]) => {
        setModalActive(false);
        if (typeof userLogin === 'string') {
            addUserArticle(userLogin, articleTitle, actions, subjectId, taskNumber, type, tags);
        }

        navigate('/profile');
    }

    return (
        <ArticleActionsContext.Provider value={{
            setActions, actions, publishArticle, saveArticle
        }}>
            <div>
                <NewArticleInstruments 
                    setSubjectId={setSubjectId}
                    setTaskNumber={setTaskNumber}
                    subjectId={subjectId}
                />
                <ArticleWhiteList/>
                {
                    modalActive ?
                        <ModalWithInput
                            setActive={setModalActive}
                            setTitle={setArticleTitle}
                            publish={publish}
                        />
                    : null
                }
            </div>
        </ArticleActionsContext.Provider>
        // <div style={{minHeight: '100vh'}}>
        //     <NewArticleInstruments 
        //         setActions={setActions} 
        //         setSubjectId={setSubjectId}
        //         setTaskNumber={setTaskNumber}
        //         subjectId={subjectId}
        //     />
        //     <ArticleWhiteList 
        //         publishArticle={publishArticle}
        //         saveArticleToDrafts={saveArticleToDrafts} 
        //         setActions={setActions} 
        //         actions={actions}
        //     />
        //     {
        //         modalActive ?
        //             <ModalWithInput type={type}
        //                 setTitle={setArticleTitle}
        //                 setActive={setModalActive} 
        //                 setSubmitted={setSubmitted}
        //             />
        //         : null
        //     }
        // </div>
    )
}