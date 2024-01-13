import {taskDataType, TaskPriorities, TaskStatuses, TaskType} from "../../../../API/types";
import {toDoListsAPI} from "../../../../API/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppStatus} from "../../../CommonActions/ApplicationsCommonActions";
import {handleAsyncServerAppError, handleAsyncServerNetworkError,} from "../../../../utils/error-utils";
import {AppRootState, ThunkError} from "../../../../utils/types";
import {todolistsActions} from "../todolists-reducer"

export const removeTask = createAsyncThunk("tasks/removeTask", async (param: { taskId: string, toDoListId: string }, thunkAPI) => {
    await toDoListsAPI.deleteTask(param.toDoListId, param.taskId)
    return ({taskId: param.taskId, toDoListId: param.toDoListId})
})
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await toDoListsAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
        return {tasks, todolistId}
    } catch (error:any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }


})
export const addTask = createAsyncThunk<TaskType,
    { title: string, toDoListId: string }, ThunkError>("tasks/addTask", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await toDoListsAPI.createTask(param.toDoListId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})
export const updateTask = createAsyncThunk("tasks/updateTask", async (param: { taskId: string, model: UpdateDomainTaskModelType, toDoListId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootState
    const task = state.tasks[param.toDoListId].find((t) => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue("task not found in the state")
    }
    const apiModel: taskDataType = {
        deadline: task.deadline,
        description: task.description,
        priority: TaskPriorities.Low,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }
    const res = await toDoListsAPI.UpdateTaskTitle(param.toDoListId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncAction = {
    removeTask,
    fetchTasks,
    addTask,
    updateTask
}


const initialState: TaskStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(todolistsActions.addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(todolistsActions.removeToDoListTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(todolistsActions.fetchToDoListTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})
export const tasksReducer = slice.reducer

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


