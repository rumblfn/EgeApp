import { FC, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Subject } from "../../types/subjects";
import { Link } from "react-router-dom";

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
            <Link to={`/subject/${subject.id}`} className="sub-menu-link" key={subject.id}>
              {subject.title}
            </Link>)
      }
    </div>
  );
};
