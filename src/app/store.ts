import {combineReducers} from "redux";
import {toDoListsReducer} from "../features/TodolistsList/Todolist/";
import {tasksReducer} from "../features/TodolistsList/Todolist/Task/";
import thunkMiddleWare from "redux-thunk";
import {applicationReducer} from "../features/Application";
import {authReducer} from "../features/Auth/";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: tasksReducer,
    app: applicationReducer,
    auth: authReducer,
})

/*export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))*/

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare),

})



// @ts-ignore
window.store = store