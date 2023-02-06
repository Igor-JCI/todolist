import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK", taskId: string, toDoListId: string
}
export type AddTasksActionType = {
    type: "ADD-TASK", title: string, toDoListId: string
}
export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS", taskId: string, isDone: boolean, toDoListId: string
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

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.toDoListId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.toDoListId] = newTasks
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasksArray = state[action.toDoListId]
            const filteredTasks = tasksArray.filter(t => t.id != action.taskId)
            stateCopy[action.toDoListId] = filteredTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.toDoListId]
            let task = tasks.find(t => t.id == action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.toDoListId]
            let task = tasks.find(t => t.id == action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.toDoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTasksAC = (taskId: string, toDoListId: string): RemoveTaskActionType => ({
    type: "REMOVE-TASK", taskId: taskId, toDoListId: toDoListId
})
export const addTaskAC = (title: string, toDoListId: string): AddTasksActionType => ({
    type: "ADD-TASK", title, toDoListId: toDoListId
})
export const changeTaskStatusAC = (taskId: string, isDone: boolean, toDoListId: string): ChangeTaskStatusType => ({
    type: "CHANGE-TASK-STATUS", taskId, isDone, toDoListId
})
export const changeTaskTitleAC = (taskId: string, title: string, toDoListId: string): ChangeTaskTitleType => ({
    type: "CHANGE-TASK-TITLE", taskId, title, toDoListId
})


