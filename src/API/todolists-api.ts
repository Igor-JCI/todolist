import axios from "axios";
import {DeleteTodolist, UpdateTodolistTitle} from "../stories/todolists-api.stories";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8c42f357-e574-4a47-b1b5-8938589ef98b"
    }
}

type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseType<D> = {
    resultCode: number
    messages: string[],
    data: D,
    fieldsErrors: string[],
}

export const toDoListsAPI = {
    getToDoLists() {
        const promise = axios.get<Array<TodolistsType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    },
    createToDoList(title: string) {
        const promise = axios.post<ResponseType<{item: TodolistsType}>>(
            "https://social-network.samuraijs.com/api/1.1/todo-lists", {title}, settings)
        return promise
    },
    deleteTodolist(toDoListId: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${toDoListId}`, settings)
        return promise
    },
    UpdateTodolistTitle(toDoListId: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${toDoListId}`, {title}, settings)
        return promise
    }
}