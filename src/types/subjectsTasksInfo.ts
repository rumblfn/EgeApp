export enum SubjectsTasksInfoActionTypes {
    FETCH_SUBJECT_TASKS_INFO = "FETCH_SUBJECT_TASKS_INFO",
    FETCH_SUBJECT_TASKS_INFO_SUCCESS = "FETCH_SUBJECT_TASKS_INFO_SUCCESS",
    FETCH_SUBJECT_TASKS_INFO_ERROR = "FETCH_SUBJECT_TASKS_INFO_ERROR",
}

export interface SubjectTasksInfo {
    id: string | number;
    subject_id: string | number;
    task_number: string | number;
    title: string;
    description: string;
    complexity: string;
}

export interface SubjectsTasksInfoState {
    subjectsTasksInfo: {};
    loading: boolean;
    error: null | string;
    loaded: boolean;
}

interface FetchSubjectsAction {
    type: SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO;
}

interface FetchSubjectsSuccessAction {
    type: SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO_SUCCESS;
    payload: {};
}

interface FetchSubjectsErrorAction {
    type: SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO_ERROR;
    payload: string;
}

export type SubjectsTasksInfoAction = FetchSubjectsAction | FetchSubjectsSuccessAction | FetchSubjectsErrorAction;