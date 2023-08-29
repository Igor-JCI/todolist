import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootState} from '../app/store'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {toDoListsReducer} from '../features/TodolistsList/todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../API/todolists-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer
})

const initialGlobalState: AppRootState = {
    toDoLists: [
        {
            id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: "",
            order: 0
        },
        {
            id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: "",
            order: 0
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
    app:{
        status: "idle",
        error:null
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
