import axios from 'axios';
import { Dispatch } from 'redux';
import { SubjectsTasksInfoAction, SubjectsTasksInfoActionTypes } from '../../types/subjectsTasksInfo';


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