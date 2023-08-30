import {v1} from "uuid";
import {toDoListsAPI, TodolistsType} from "../../API/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, SetStatusActionType} from "../../app/app-reducer";

export let toDoListId1 = v1()
export let toDoListId2 = v1()

const initialState: Array<TodolistsDomainType> = []

export const toDoListsReducer = (state: Array<TodolistsDomainType> = initialState, action: ActionsType): Array<TodolistsDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus:"idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus:"idle"}))
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (id: string) => ({
    type: "REMOVE-TODOLIST", id
} as const)
export const addTodolistAC = (todolist: TodolistsType) => ({
    type: "ADD-TODOLIST", todolist
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistsType>) => ({
    type: "SET-TODOLISTS",
    todolists
} as const)

//thunks
export const fetchToDoListTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC("loading"))
        toDoListsAPI.getToDoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC("succeeded"))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC("loading"))
        toDoListsAPI.createToDoList(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC("succeeded"))
            })
    }
}
export const removeToDoListTC = (toDoListId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        toDoListsAPI.deleteTodolist(toDoListId)
            .then((res) => {
                dispatch(removeTodolistAC(toDoListId))
            })
    }
}
export const changeTodolistTitleTC = (toDoListId: string, newTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        toDoListsAPI.UpdateTodolistTitle(toDoListId, newTitle)
            .then((res) => {
                dispatch(changeTodolistTitleAC(toDoListId, newTitle))
            })
    }
}

//types
type ThunkDispatch = Dispatch<ActionsType | SetStatusActionType>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsDomainType = TodolistsType & {
    filter: FilterValuesType,
    entityStatus:RequestStatusType
}

