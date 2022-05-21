import { FC, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { SubjectTasksInfo } from "../../types/subjectsTasksInfo";
import { useParams } from "react-router-dom";

type Params = {
    subjectId: string;
  };

export const SubjectPage: FC = () => {
    const params = useParams<Params>();
    const subjectId = params.subjectId || '1';
    const {loading, subjectsTasksInfo, error} = useTypedSelector(state => state.subjectsTasksInfo)
    const {fetchSubjectTasksInfo} = useActions()

    useEffect(() => {
        fetchSubjectTasksInfo(parseInt(subjectId))
    }, [subjectId])

    return (
        <div>
            
        </div>
    )
}
