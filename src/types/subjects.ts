export enum SubjectsActionTypes {
    FETCH_SUBJECTS = "FETCH_SUBJECTS",
    FETCH_SUBJECTS_SUCCESS = "FETCH_SUBJECTS_SUCCESS",
    FETCH_SUBJECTS_ERROR = "FETCH_SUBJECTS_ERROR"
}

export interface SubjectsState {
    subjects: any[];
    loading: boolean;
    error: null | string;
}
  
interface FetchSubjectsAction {
    type: SubjectsActionTypes.FETCH_SUBJECTS;
}

interface FetchSubjectsSuccessAction {
    type: SubjectsActionTypes.FETCH_SUBJECTS_SUCCESS;
    payload: any[];
}

interface FetchSubjectsErrorAction {
    type: SubjectsActionTypes.FETCH_SUBJECTS_ERROR;
    payload: string;
}

export type SubjectsAction = FetchSubjectsAction | FetchSubjectsSuccessAction | FetchSubjectsErrorAction;