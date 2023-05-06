import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, toDoListId1, toDoListId2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../API/todolists-api";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK", taskId: string, toDoListId: string
}
export type AddTasksActionType = {
    type: "ADD-TASK", title: string, toDoListId: string
}
export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS", taskId: string, status: TaskStatuses, toDoListId: string
}
export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE", taskId: string, title: string, toDoListId: string
}

type ActionsType =
    AddTodolistActionType
    | RemoveTaskActionType
    | AddTasksActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | RemoveTodolistActionType

const initialState: TaskStateType = {
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.toDoListId]
            const newTask: TaskType = {
                id: v1(), title: action.title, status: TaskStatuses.Completed,
                todoListId: action.toDoListId, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.toDoListId] = newTasks
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasksArray = state[action.toDoListId]
            const filteredTasks = tasksArray.filter(t => t.id !== action.taskId)
            stateCopy[action.toDoListId] = filteredTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let todoListTasks = state[action.toDoListId]
            state[action.toDoListId] = todoListTasks.map(t => t.id === action.taskId
                ? {...t, status: action.status}
                : t)
            return ({...state})
        }
        case "CHANGE-TASK-TITLE": {
            let todoListTasks = state[action.toDoListId]
            state[action.toDoListId] = todoListTasks.map(t => t.id === action.taskId
                ? {...t, title: action.title}
                : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.toDoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTasksAC = (taskId: string, toDoListId: string): RemoveTaskActionType => ({
    type: "REMOVE-TASK", taskId: taskId, toDoListId: toDoListId
})
export const addTaskAC = (title: string, toDoListId: string): AddTasksActionType => ({
    type: "ADD-TASK", title, toDoListId: toDoListId
})
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, toDoListId: string): ChangeTaskStatusType => ({
    type: "CHANGE-TASK-STATUS", taskId, status, toDoListId
})
export const changeTaskTitleAC = (taskId: string, title: string, toDoListId: string): ChangeTaskTitleType => ({
    type: "CHANGE-TASK-TITLE", taskId, title, toDoListId
})


