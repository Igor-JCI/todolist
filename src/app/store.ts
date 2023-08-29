import {applyMiddleware, combineReducers, createStore} from "redux";
import {toDoListsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunkMiddleWare from "redux-thunk";
import {appReducer} from "./app-reducer";

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: tasksReducer,
    app:appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))


// @ts-ignore
window.store = store