import { SubjectsState, SubjectsAction, SubjectsActionTypes } from "../../types/subjects"

const initialState: SubjectsState = {
    subjects: [],
    loading: false,
    error: null
}

export const subjectsReducer = (state = initialState, action: SubjectsAction): SubjectsState => {
    switch (action.type) {
        case SubjectsActionTypes.FETCH_SUBJECTS:
            return {
                loading: true,
                error: null,
                subjects: []
            }
        case SubjectsActionTypes.FETCH_SUBJECTS_SUCCESS:
            return {
                loading: false,
                error: null,
                subjects: action.payload
            }
        case SubjectsActionTypes.FETCH_SUBJECTS_ERROR:
            return {
                loading: true,
                error: action.payload,
                subjects: []
            }
        default:
            return state;
    }
}