import {applyMiddleware, combineReducers, createStore} from "redux";
import {toDoListsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunkMiddleWare from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
/*export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))*/

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare),

})


// @ts-ignore
window.store = store