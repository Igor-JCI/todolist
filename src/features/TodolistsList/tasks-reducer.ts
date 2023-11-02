import {Dispatch} from "redux";
import {taskDataType, TaskPriorities, TaskStatuses, TaskType, toDoListsAPI} from "../../API/todolists-api";
import {AppRootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";


const initialState: TaskStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTasksAC(state, action: PayloadAction<{ taskId: string, toDoListId: string }>) {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, toDoListId: string }>) {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer
export const {removeTasksAC} = slice.actions
export const {addTaskAC} = slice.actions
export const {updateTaskAC} = slice.actions
export const {setTasksAC} = slice.actions

//thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        toDoListsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC({tasks: res.data.items, todolistId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}
export const removeTaskTC = (toDoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.deleteTask(toDoListId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTasksAC({taskId, toDoListId}))
                }
            })
    }
}
export const addTaskTC = (title: string, toDoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        toDoListsAPI.createTask(toDoListId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.data.item}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, toDoListId: string) => {
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
            ...model
        }
        toDoListsAPI.UpdateTaskTitle(toDoListId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, model, toDoListId}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

//types
export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}


