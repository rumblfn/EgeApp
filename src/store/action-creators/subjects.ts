import axios from 'axios';
import { Dispatch } from 'redux';
import { SubjectsAction, SubjectsActionTypes } from './../../types/subjects';
import { SubjectsTasksInfoAction, SubjectsTasksInfoActionTypes } from '../../types/subjectsTasksInfo';


export const fetchSubjects = () => {
    return async (dispatch: Dispatch<SubjectsAction>) => {
        try {
            dispatch({
                type: SubjectsActionTypes.FETCH_SUBJECTS
            })
            const response = await axios.get("http://192.168.1.61:8888/subject/getSubjects")
            dispatch({
                type: SubjectsActionTypes.FETCH_SUBJECTS_SUCCESS, 
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: SubjectsActionTypes.FETCH_SUBJECTS_ERROR, 
                payload: 'error'
            })
        }
    }
}

export const fetchSubjectTasksInfo = (subject_id: number) => {
    return async (dispatch: Dispatch<SubjectsTasksInfoAction>) => {
        try {
            dispatch({
                type: SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO
            })
            const response = await axios.get(`http://192.168.1.61:8888/subject/getTasksInfo/?subject_id=${subject_id}`)
            dispatch({
                type: SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO_SUCCESS, 
                payload: {[subject_id]: response.data}
            })
        } catch (e) {
            dispatch({
                type: SubjectsTasksInfoActionTypes.FETCH_SUBJECT_TASKS_INFO_ERROR, 
                payload: 'error'
            })
        }
    }
}