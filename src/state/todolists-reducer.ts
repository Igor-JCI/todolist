import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST", id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST", title: string, toDoListId: string
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
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const toDoListsReducer = (state: Array<ToDoListType>, action: ActionsType): Array<ToDoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let filteredToDoList = state.filter(t => t.id !== action.id)
            return filteredToDoList
        }
        case "ADD-TODOLIST": {
            debugger
            return [{id: action.toDoListId, title: action.title, filter: "all"}, ...state]
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
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTodolistAC = (toDoListId: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST", id: toDoListId
})
export const addTodolistAC = (title: string, toDoListId:string): AddTodolistActionType => ({
    type: "ADD-TODOLIST", title: title, toDoListId
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

