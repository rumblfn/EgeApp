import { FC, useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { SubjectTasksInfo } from '../../types/subjectsTasksInfo';
import { getRandomInt } from '../static/mathRandom';
import { Link } from "react-router-dom";

interface SubjectTasksInfoListProps {
    subjectId: number;
}

export const SubjectTasksInfoList: FC<SubjectTasksInfoListProps> = ({subjectId}) => {
    const [listTasks, setListTasks] = useState<SubjectTasksInfo[]>([])
    const {subjectsTasksInfo, loaded} = useTypedSelector<any>(state => state.subjectsTasksInfo)
    const {fetchSubjectTasksInfo} = useActions()

    useEffect(() => {
        if (!subjectsTasksInfo.hasOwnProperty(subjectId)) {
            fetchSubjectTasksInfo(subjectId)
        } else {
            setListTasks(subjectsTasksInfo[subjectId])
        }
    }, [subjectId, loaded])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {
                listTasks.map((item) => 
                <Link to={`/subject/${item.subject_id}/${item.id}`}
                    style={{fontSize: 22, fontWeight: 500, margin: 10}} 
                    className={`header-link link-with-hover link-with-hover${getRandomInt(5)}`} 
                    key={`${item.subject_id}-${item.id}`}
                >
                    {item.task_number}. {item.title}
                </Link>
                )
            }
        </div>
    )
}