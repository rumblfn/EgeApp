import { FC, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Subject } from "../../types/subjects";
import { SubjectTasksInfo } from "../../types/subjectsTasksInfo";
import './style.css';

export const NewArticleInstruments:FC = () => {
    const {loading, subjects, error} = useTypedSelector(state => state.subjects)
    const [listTasks, setListTasks] = useState<SubjectTasksInfo[]>([])
    const {fetchSubjects, fetchSubjectTasksInfo} = useActions()
    const [subjectId, setSubjectId] = useState<number>(1);
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

    console.log(listTasks)

    return (
        <div className="newArticleInstruments">
            <select onChange={e => setSubjectId(parseInt(e.target.value))} className="selectSubject" name="selectSubject">
                {subjects.map((subject: Subject) => 
                    <option value={subject.id} key={subject.id}>
                        {subject.title}
                    </option>)
                }
            </select>
            <select className="selectSubjectTask" name="selectSubjectTask">
                {listTasks.map((item: SubjectTasksInfo) => 
                    <option value={item.task_number} key={item.task_number}>
                        {item.task_number}. {item.title}
                    </option>)
                }
            </select>
        </div>
    )
}