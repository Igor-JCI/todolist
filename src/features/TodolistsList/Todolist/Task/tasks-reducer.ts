import {
    FieldErrorType,
    taskDataType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    toDoListsAPI
} from "../../../../API/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {AppRootState} from "../../../../app/store";
import {todolistsActions} from "../todolists-reducer"

export const removeTask = createAsyncThunk("tasks/removeTask", async (param: { taskId: string, toDoListId: string }, thunkAPI) => {
    await toDoListsAPI.deleteTask(param.toDoListId, param.taskId)
    return ({taskId: param.taskId, toDoListId: param.toDoListId})
})
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await toDoListsAPI.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks: res.data.items, todolistId}
})
export const addTask = createAsyncThunk<TaskType,
    { title: string, toDoListId: string },
    { rejectValue: { errors: Array<string>, fieldsError?: Array<FieldErrorType> } }>("tasks/addTask", async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await toDoListsAPI.createTask(param.toDoListId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue({errors: res.data.messages, fieldsError: res.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch, false)
        return rejectWithValue({errors: [error.message], fieldsError: undefined})
    }


})
export const updateTask = createAsyncThunk("tasks/updateTask", async (param: { taskId: string, model: UpdateDomainTaskModelType, toDoListId: string }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppRootState
    const task = state.tasks[param.toDoListId].find((t) => t.id === param.taskId)
    if (!task) {
        return rejectWithValue("task not found in the state")
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
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
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


