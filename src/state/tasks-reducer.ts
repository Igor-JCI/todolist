import {TaskStateType} from "../App";
import {Dispatch} from "redux";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from "./todolists-reducer";
import {taskDataType, TaskPriorities, TaskStatuses, TaskType, toDoListsAPI} from "../API/todolists-api";
import {AppRootState} from "./store";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK", taskId: string, toDoListId: string
}
export type AddTasksActionType = {
    type: "ADD-TASK", task: TaskType
}
export type UpdateTaskActionType = {
    type: "UPDATE-TASK", taskId: string, model: UpdateDomainTaskModelType, toDoListId: string
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
    | UpdateTaskActionType
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
        case "UPDATE-TASK": {
            let todoListTasks = state[action.toDoListId]
            state[action.toDoListId] = todoListTasks.map(t => t.id === action.taskId
                ? {...t, ...action.model} : t)
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
            stateCopy[action.todolist.id] = []
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
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, toDoListId: string): UpdateTaskActionType => ({
    type: "UPDATE-TASK", taskId, model, toDoListId
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


export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, toDoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[toDoListId].find((t) => t.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }
        const apiModel: taskDataType = {
            deadline: task.deadline,
            description: task.description,
            priority: TaskPriorities.Low,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        toDoListsAPI.UpdateTaskTitle(toDoListId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, domainModel, toDoListId))
            })
    }
}

/*
export const UpdateTaskTitleTC = (taskId: string, newTitle: string, toDoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[toDoListId].find(t => t.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }
        const model: taskDataType = {
            deadline: task.deadline,
            description: task.description,
            priority: TaskPriorities.Low,
            startDate: task.startDate,
            title: newTitle,
            status: task.status
        }
        toDoListsAPI.UpdateTaskTitle(toDoListId, taskId, model)
            .then((res) => {
                dispatch(changeTaskTitleAC(taskId, newTitle, toDoListId))
            })
    }
}*/
