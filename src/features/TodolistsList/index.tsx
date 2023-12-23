import {asyncAction as tasksAsyncActions} from "./Todolist/Task/tasks-reducer"
import {todolistsActions} from "./Todolist";
import {TodolistsList} from "./TodolistsList"


const tasksActions = {
    ...tasksAsyncActions
}

export {
    tasksActions,
    todolistsActions,
    TodolistsList
}