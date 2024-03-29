import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import {v1} from 'uuid'
import {AppRootState} from '../utils/types'
import {tasksReducer} from '../features/TodolistsList/Todolist/Task/tasks-reducer'
import {toDoListsReducer} from '../features/TodolistsList/Todolist/todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../API/types";
import {applicationReducer} from "../features/Application/application-reducer";
import thunkMiddleWare from "redux-thunk";
import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {MemoryRouter} from "react-router-dom";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer,
    app: applicationReducer,
    auth: authReducer
})

const initialGlobalState: AppRootState = {
    toDoLists: [
        {
            id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: "",
            order: 0, entityStatus: "idle"
        },
        {
            id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: "",
            order: 0, entityStatus: "loading"
        }
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                todoListId: "toDoListId2",
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        status: "succeeded",
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
}

export const storyBookStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialGlobalState,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleWare)
    }
)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

export const BrowserRouterDecorator = (storyFn: any) => (
    <MemoryRouter>
        {storyFn()}
    </MemoryRouter>)
