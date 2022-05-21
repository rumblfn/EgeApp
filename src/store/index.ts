import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { subjectsReducer } from "./reducers/subjectsReducer";
import { subjectsTasksInfoReducer } from "./reducers/subjectsTasksInfoReducer";

const rootReducer = combineReducers({
    subjects: subjectsReducer,
    subjectsTasksInfo: subjectsTasksInfoReducer
})

export type RootState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))