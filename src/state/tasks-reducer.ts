import {TaskStateType} from "../App";
import {Dispatch} from "redux";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, toDoListsAPI} from "../API/todolists-api";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;


export type RemoveTaskActionType = {
    type: "REMOVE-TASK", taskId: string, toDoListId: string
}
export type AddTasksActionType = {
    type: "ADD-TASK", task: TaskType
}
export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS", taskId: string, status: TaskStatuses, toDoListId: string
}
export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE", taskId: string, title: string, toDoListId: string
}
export type SetTasksActionType = {
    type: "SET-TASKS",
    tasks: Array<TaskType>,
    todolistId: string
}

type ActionsType =
    AddTodolistActionType
    | RemoveTaskActionType
    | AddTasksActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.task.todoListId]
            const newTask: TaskType = action.task
            const newTasks = [newTask, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        case "REMOVE-TASK": {
            debugger
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
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTasksAC = (taskId: string, toDoListId: string): RemoveTaskActionType => ({
    type: "REMOVE-TASK", taskId: taskId, toDoListId: toDoListId
})
export const addTaskAC = (task: TaskType): AddTasksActionType => ({
    type: "ADD-TASK", task
})
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, toDoListId: string): ChangeTaskStatusType => ({
    type: "CHANGE-TASK-STATUS", taskId, status, toDoListId
})
export const changeTaskTitleAC = (taskId: string, title: string, toDoListId: string): ChangeTaskTitleType => ({
    type: "CHANGE-TASK-TITLE", taskId, title, toDoListId
})
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => ({
    type: "SET-TASKS", tasks, todolistId
})

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (toDoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.deleteTask(toDoListId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTasksAC(taskId, toDoListId))
                }
            })
    }
}

export const addTaskTC = (title: string, toDoListId: string) => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.createTask(toDoListId, title)
            .then((res) => {
                debugger
                dispatch(addTaskAC(res.data.data.item))
            })
    }

}
