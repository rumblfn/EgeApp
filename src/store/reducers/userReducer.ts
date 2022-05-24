import { UserState, UserAction, UserActionTypes } from "../../types/user"

const initialState: UserState = {
    user: {
        email: null,
        karma: null,
        login: null,
        statusUser: false
    },
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
            return {
                ...state,
                loading: true,
                error: null
            }
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {
                loading: false,
                error: null,
                user: action.payload
            }
        case UserActionTypes.FETCH_USER_ERROR:
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        default:
            return state;
    }
}