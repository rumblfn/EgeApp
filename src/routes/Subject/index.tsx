import { FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import { SubjectTasksInfoList } from "../../components/listOfSubjectTasksInfo";

type Params = {
    subjectId: string;
};

export const SubjectPage: FC = () => {
    const params = useParams<Params>();
    const subjectId = params.subjectId || '1';
    const {subjects} = useTypedSelector(state => state.subjects)
    const subjectTitle = subjects.filter(i => { return i.id == subjectId })[0]?.title

    return (
        <div className="container">
            <div style={{width: '100%'}}>
                <h2>{subjectTitle}</h2>
                <SubjectTasksInfoList subjectId={parseInt(subjectId)} />
            </div>
        </div>
    )
}
