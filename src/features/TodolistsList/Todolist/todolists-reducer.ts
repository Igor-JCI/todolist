import {v1} from "uuid";
import {toDoListsAPI} from "../../../API/todolists-api";
import {TodolistsType} from "../../../API/types";
import {RequestStatusType} from "../../Application/application-reducer";
import {setAppStatus} from "../../CommonActions/ApplicationsCommonActions";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError
} from "../../../utils/error-utils";
import {ThunkError} from "../../../utils/types";

export let toDoListId1 = v1()
export let toDoListId2 = v1()

const fetchToDoListTC = createAsyncThunk<{ todolists: TodolistsType[] }, undefined, ThunkError>("todolists/fetchTodolists", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await toDoListsAPI.getToDoLists()
        thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
        return {todolists: res.data}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const removeToDoListTC = createAsyncThunk<{ id: string }, string, ThunkError>("todolists/removeToDoList", async (toDoListId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    thunkAPI.dispatch(changeTodolistEntityStatus({id: toDoListId, status: "loading"}))
    await toDoListsAPI.deleteTodolist(toDoListId)
    try {
        thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
        return {id: toDoListId}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const addTodolistTC = createAsyncThunk<{ todolist: TodolistsType }, string, ThunkError>("todolists/addTodolist", async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    const res = await toDoListsAPI.createToDoList(title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})
const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle", async (param: { id: string, title: string }, thunkAPI) => {
    const res = await toDoListsAPI.UpdateTodolistTitle(param.id, param.title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {id: param.id, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, true)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})


export const slice = createSlice({
    name: "toDoLists",
    initialState: [] as Array<TodolistsDomainType>,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchToDoListTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        })
        builder.addCase(removeToDoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})
export const toDoListsReducer = slice.reducer
export const {changeTodolistFilter, changeTodolistEntityStatus} = slice.actions
export const todolistsActions = {
    fetchToDoListTC,
    removeToDoListTC,
    addTodolistTC,
    changeTodolistTitleTC,
    changeTodolistFilter,
    changeTodolistEntityStatus
}

//types

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export type FilterValuesType = "all" | "active" | "completed"

