import { FC, useEffect, useState } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useActions } from "../../hooks/useActions"
import { SubjectTasksInfo } from '../../types/subjectsTasksInfo';

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
        <div>
            {
                listTasks.map((item) => 
                <p key={`${item.subject_id}-${item.id}`}>
                    {item.task_number}. {item.title}
                </p>
                )
            }
        </div>
    )
}