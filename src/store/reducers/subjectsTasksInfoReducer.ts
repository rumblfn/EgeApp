import { SubjectsTasksInfoState, SubjectsTasksInfoAction, SubjectsTasksInfoActionTypes } from "../../types/subjectsTasksInfo"

const initialState: SubjectsTasksInfoState = {
    subjectsTasksInfo: {},
    loading: false,
    error: null,
    loaded: false
}

export const subjectsTasksInfoReducer = (state = initialState, action: SubjectsTasksInfoAction): SubjectsTasksInfoState => {
    switch (action.type) {
        case SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO:
            return {
                loading: true,
                error: null,
                subjectsTasksInfo: {...state.subjectsTasksInfo},
                loaded: false
            }
        case SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO_SUCCESS:
            return {
                loading: false,
                error: null,
                subjectsTasksInfo: {...state.subjectsTasksInfo, ...action.payload},
                loaded: true
            }
        case SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO_ERROR:
            return {
                loading: true,
                error: action.payload,
                subjectsTasksInfo: {...state.subjectsTasksInfo},
                loaded: false
            }
        default:
            return state;
    }
}