import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {taskDataType, TaskPriorities, toDoListsAPI} from "../../API/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {UpdateDomainTaskModelType} from "./tasks-reducer";
import {AppRootState} from "../../app/store";

export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (param: { toDoListId: string, taskId: string }, thunkAPI) => {
    await toDoListsAPI.deleteTask(param.toDoListId, param.taskId)
    return ({taskId: param.taskId, toDoListId: param.toDoListId})
})
export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await toDoListsAPI.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks: res.data.items, todolistId}
})
export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: { title: string, toDoListId: string }, {
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
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }


})
export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (param: { taskId: string, model: UpdateDomainTaskModelType, toDoListId: string }, {
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