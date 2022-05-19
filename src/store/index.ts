import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { subjectsReducer } from "./subjects/subjectsReducer";

const rootReducer = combineReducers({
    subjects: subjectsReducer,
})

export type RootState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))