import { userReducer } from './reducers/userReducer';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { subjectsReducer } from "./reducers/subjectsReducer";
import { subjectsTasksInfoReducer } from "./reducers/subjectsTasksInfoReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    subjects: subjectsReducer,
    subjectsTasksInfo: subjectsTasksInfoReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))