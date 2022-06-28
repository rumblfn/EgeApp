import { FC, useContext, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ArticleActionsContext from "../../routes/newArticle/context";
import { ArticleActionTypes, ArticleAction } from "../../types/article";
import { Subject } from "../../types/subjects";
import { SubjectTasksInfo } from "../../types/subjectsTasksInfo";
import { Instrument } from "./instrument";
import styles from './style.module.scss'

interface Props {
    subjectId: number;
    setSubjectId: (value: number) => void;
    setTaskNumber: (value: number) => void;
}

export const NewArticleInstruments:FC<Props> = ({
    subjectId, setSubjectId, setTaskNumber
}) => {
    const {subjects} = useTypedSelector(state => state.subjects)
    const [listTasks, setListTasks] = useState<SubjectTasksInfo[]>([])
    const {fetchSubjects, fetchSubjectTasksInfo} = useActions()
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
    
    const contextStore = useContext(ArticleActionsContext)
    if (!contextStore?.setActions) {
        return null
    }
    const {setActions} = contextStore
    
    const handleNewAction = (action: ArticleAction) => {
        setActions(prev => [
            ...prev, action
        ])
    }
    
    const returnAction = (type: any): ArticleAction => ({
        type, content: '', tags: []
    })

    return (
        <div className={styles['instrument-list-box']}>
            <div className={styles['instrument-top']}>
                <select onChange={e => setSubjectId(parseInt(e.target.value))} className="selectSubject" name="selectSubject">
                    {subjects.map((subject: Subject) => 
                        <option value={subject.id} key={subject.id}>
                            {subject.title}
                        </option>)
                    }
                </select>
                <select onChange={e => setTaskNumber(parseInt(e.target.value))} className="selectSubjectTask" name="selectSubjectTask">
                    {listTasks.map((item: SubjectTasksInfo) => 
                        <option value={item.task_number} key={item.task_number}>
                            {item.task_number}. {item.title}
                        </option>)
                    }
                </select>
            </div>
            <div className={styles['instrument-list']}>
                <Instrument 
                    handleNewAction={handleNewAction} 
                    awesomeClass='fa-heading' 
                    action={returnAction(ArticleActionTypes.HEADING)}
                />
                <Instrument 
                    handleNewAction={handleNewAction} 
                    awesomeClass='fa-quote-left' 
                    action={returnAction(ArticleActionTypes.QUOTE)}
                />
                <Instrument
                    handleNewAction={handleNewAction} 
                    awesomeClass='fa-image' 
                    action={{
                        type: ArticleActionTypes.IMAGE, 
                        content: '',
                    }}
                />
                <Instrument 
                    handleNewAction={handleNewAction} 
                    awesomeClass='fa-font' action={returnAction(ArticleActionTypes.TEXT)}
                />
                <Instrument 
                    handleNewAction={handleNewAction} 
                    awesomeClass='fa-italic' 
                    action={returnAction(ArticleActionTypes.ITALIC_TEXT)}
                />
                <Instrument 
                    handleNewAction={handleNewAction} 
                    awesomeClass='fa-code' 
                    action={{
                        type: ArticleActionTypes.CODE_TEXT, 
                        content: '', language: ''
                    }}
                />
                <Instrument 
                    handleNewAction={handleNewAction} 
                    awesomeClass='fa-bold' 
                    action={returnAction(ArticleActionTypes.BOLD_TEXT)}
                />
            </div>
        </div>
    )
}