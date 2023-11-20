import {v1} from "uuid";
import {TodolistsType} from "../../API/todolists-api";
import {RequestStatusType} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistTC, changeTodolistTitleTC, fetchToDoListTC, removeToDoListTC} from "./todolist-actions";

export let toDoListId1 = v1()
export let toDoListId2 = v1()

const slice = createSlice({
    name: "toDoLists",
    initialState: [] as Array<TodolistsDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
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
export const {changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions

//types

export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export type FilterValuesType = "all" | "active" | "completed"

