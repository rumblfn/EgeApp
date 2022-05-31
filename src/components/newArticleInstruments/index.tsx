import { FC, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Subject } from "../../types/subjects";
import { SubjectTasksInfo } from "../../types/subjectsTasksInfo";
import { ArticleActionTypes, ArticleAction } from "../../types/article";
import './style.css';

interface Props {
    setActions: (newState: ArticleAction[] | 
                    ((prevState: ArticleAction[]) 
                        => ArticleAction[])) 
                => void;
}

export const NewArticleInstruments:FC<Props> = ({setActions}) => {
    const {subjects} = useTypedSelector(state => state.subjects)
    const [listTasks, setListTasks] = useState<SubjectTasksInfo[]>([])
    const {fetchSubjects, fetchSubjectTasksInfo} = useActions()
    const [subjectId, setSubjectId] = useState<number>(1);
    const [taskNumber, setTaskNumber] = useState<number>(1);
    const {subjectsTasksInfo, loaded} = useTypedSelector<any>(state => state.subjectsTasksInfo)

    useEffect(() => {
        if (!subjects.length) {
            fetchSubjects()
        }
    }, []);

    useEffect(() => {
        if (!subjectsTasksInfo.hasOwnProperty(subjectId)) {
            fetchSubjectTasksInfo(subjectId)
        } else {
            setListTasks(subjectsTasksInfo[subjectId])
        }
    }, [subjectId, loaded])

    return (
        <div className="newArticleInstruments">
            <div className="newArticleInstruments-top">
                <select onChange={e => setTaskNumber(parseInt(e.target.value))} className="selectSubject" name="selectSubject">
                    {subjects.map((subject: Subject) => 
                        <option value={subject.id} key={subject.id}>
                            {subject.title}
                        </option>)
                    }
                </select>
                <select onChange={e => setSubjectId(parseInt(e.target.value))} className="selectSubjectTask" name="selectSubjectTask">
                    {listTasks.map((item: SubjectTasksInfo) => 
                        <option value={item.task_number} key={item.task_number}>
                            {item.task_number}. {item.title}
                        </option>)
                    }
                </select>
            </div>
            <div className="mainInstruments">
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.HEADING,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-heading"/>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.QUOTE,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-quote-left"/>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.IMAGE,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-image"/>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.LINK,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-link"/>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.TEXT,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-font"></i>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.ITALIC_TEXT,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-italic"/>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.CODE_TEXT,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-code"/>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.BOLD_TEXT,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-bold"/>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.FORMULA,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-superscript"/>
                </button>
                <button className="instrument"
                    onClick={() => {
                        setActions(prevState => [
                            ...prevState,
                            {
                                type: ArticleActionTypes.PRE_TEXT,
                                content: null,
                                language: null,
                                linkTitle: null
                            }
                        ])
                    }}
                >
                    <i className="fa-solid fa-tree"/>
                </button>
            </div>
        </div>
    )
}