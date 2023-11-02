import {v1} from "uuid";
import {toDoListsAPI, TodolistsType} from "../../API/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export let toDoListId1 = v1()
export let toDoListId2 = v1()

const initialState: Array<TodolistsDomainType> = []

const slice = createSlice({
    name: "toDoLists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistsType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistsType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }
    }
})
export const toDoListsReducer = slice.reducer
export const {
    removeTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC,
    addTodolistAC, setTodolistsAC, changeTodolistEntityStatusAC
} = slice.actions


//thunks
export const fetchToDoListTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        toDoListsAPI.getToDoLists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        toDoListsAPI.createToDoList(title)
            .then((res) => {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}
export const removeToDoListTC = (toDoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTodolistEntityStatusAC({id: toDoListId, status: "loading"}))
        toDoListsAPI.deleteTodolist(toDoListId)
            .then((res) => {
                dispatch(removeTodolistAC({id: toDoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}
export const changeTodolistTitleTC = (toDoListId: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.UpdateTodolistTitle(toDoListId, newTitle)
            .then((res) => {
                dispatch(changeTodolistTitleAC({id: toDoListId, title: newTitle}))
            })
    }
}

//types

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export type FilterValuesType = "all" | "active" | "completed"

