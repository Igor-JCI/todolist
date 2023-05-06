import {applyMiddleware, combineReducers, createStore} from "redux";
import {toDoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunkMiddleWare from "redux-thunk";

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))


// @ts-ignore
window.store = store