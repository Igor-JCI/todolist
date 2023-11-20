import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {toDoListsAPI} from "../../API/todolists-api";
import {handleServerNetworkError} from "../../utils/error-utils";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";

export const fetchToDoListTC = createAsyncThunk("todolists/fetchTodolists", async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await toDoListsAPI.getToDoLists()
    try {
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {todolists: res.data}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const removeToDoListTC = createAsyncThunk("todolists/removeToDoList", async (toDoListId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id: toDoListId, status: "loading"}))
    const res = await toDoListsAPI.deleteTodolist(toDoListId)
    try {
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {id: toDoListId}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const addTodolistTC = createAsyncThunk("todolists/addTodolist", async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await toDoListsAPI.createToDoList(title)
    try {
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {todolist: res.data.data.item}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle", async (param: { toDoListId: string, newTitle: string }, {
    dispatch,
    rejectWithValue
}) => {
    await toDoListsAPI.UpdateTodolistTitle(param.toDoListId, param.newTitle)
    try {
        return {id: param.toDoListId, title: param.newTitle}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})