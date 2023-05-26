import {v1} from "uuid";
import {toDoListsAPI, TodolistsType} from "../API/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST", id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST", todolist: TodolistsType
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: "SET-TODOLISTS",
    todolists: Array<TodolistsType>
}
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export let toDoListId1 = v1()
export let toDoListId2 = v1()

const initialState: Array<TodolistsDomainType> = []
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType
}

export const toDoListsReducer = (state: Array<TodolistsDomainType> = initialState, action: ActionsType): Array<TodolistsDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let filteredToDoList = state.filter(t => t.id !== action.id)
            return filteredToDoList
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistsDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let td = state.find(tl => tl.id === action.id)
            if (td) {
                td.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }
        default:
            return state
    }
}
export const removeTodolistAC = (toDoListId: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST", id: toDoListId
})
export const addTodolistAC = (todolist: TodolistsType): AddTodolistActionType => ({
    type: "ADD-TODOLIST", todolist
})
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE" as const,
    id: id,
    title: title
})
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    id: id,
    filter: filter
})
export const setTodolistsAC = (todolists: Array<TodolistsType>): SetTodolistsActionType => ({
    type: "SET-TODOLISTS",
    todolists
})

export const fetchToDoListTC = () => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.createToDoList(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const removeToDoListTC = (toDoListId: string) => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.deleteTodolist(toDoListId)
            .then((res) => {
                dispatch(removeTodolistAC(toDoListId))
            })
    }
}

export const changeTodolistTitleTC = (toDoListId: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        toDoListsAPI.UpdateTodolistTitle(toDoListId, newTitle)
            .then((res) => {
                dispatch(changeTodolistTitleAC(toDoListId, newTitle))
            })
    }
}



