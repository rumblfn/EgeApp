import axios from 'axios';
import { Dispatch } from 'redux';
import { SubjectsAction, SubjectsActionTypes } from './../../types/subjects';

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