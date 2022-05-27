import { FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";

type Params = {
    subjectId: string;
    taskId: string;
};

export const SubjectTaskPage: FC = () => {
    const params = useParams<Params>();
    console.log(params)
    const subjectId = params.subjectId || '1';
    const {subjects} = useTypedSelector(state => state.subjects)
    const subjectTitle = subjects.filter(i => { return i.id == subjectId })[0]?.title

    return (
        <div className="container">
            <div style={{width: '100%', marginBottom: 64}}>
                <h2>{subjectTitle}</h2>
                {/* <div dangerouslySetInnerHTML={{ __html: "<h1>test 2</h1>" }} /> */}
            </div>
        </div>
    )
}
