import {v1} from "uuid";
import {FieldErrorType, TaskType, toDoListsAPI, TodolistsType} from "../../../API/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

export let toDoListId1 = v1()
export let toDoListId2 = v1()

const fetchToDoListTC = createAsyncThunk("todolists/fetchTodolists", async (param, {
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
const removeToDoListTC = createAsyncThunk("todolists/removeToDoList", async (toDoListId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatus({id: toDoListId, status: "loading"}))
    const res = await toDoListsAPI.deleteTodolist(toDoListId)
    try {
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {id: toDoListId}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
const addTodolistTC = createAsyncThunk <{todolist: TodolistsType}, string,
    { rejectValue: { errors: Array<string>, fieldsError?: Array<FieldErrorType>} }>("todolists/addTodolist", async (title, {dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await toDoListsAPI.createToDoList(title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue({errors: res.data.messages, fieldsError: res.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch, false)
        return rejectWithValue({errors: [error.message], fieldsError: undefined})
    }
})
const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle", async (param: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    await toDoListsAPI.UpdateTodolistTitle(param.id, param.title)
    try {
        return {id: param.id, title: param.title}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
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

