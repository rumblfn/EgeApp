import { FC, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Subject } from "../../types/subjects";

export const ListOfSubjects: FC = () => {
  const {loading, subjects, error} = useTypedSelector(state => state.subjects)
  const {fetchSubjects} = useActions()

  useEffect(() => {
    fetchSubjects()
  }, []);

  return (
    <div className="sub-menu">
      {
          subjects.map((subject: Subject) => 
            <p key={subject.id} className="sub-menu-link">
                {subject.title}
            </p>)
      }
    </div>
  );
};
