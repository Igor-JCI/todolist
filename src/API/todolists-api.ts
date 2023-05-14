import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8c42f357-e574-4a47-b1b5-8938589ef98b"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})
export type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    addedDate: string,
    deadline: string,
    description: string,
    id: string,
    order: number,
    priority: TaskPriorities,
    startDate: string,
    status: TaskStatuses,
    title: string,
    todoListId: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D,
    fieldsErrors: string[],
}
type ResponseTasksType = {
    error: null | string,
    items: TaskType[],
    totalCount: number,
}
export type taskDataType = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string
}
export const toDoListsAPI = {
    getToDoLists() {
        return instance.get<Array<TodolistsType>>("todo-lists")
    },
    createToDoList(title: string) {
        return instance.post<ResponseType<{ item: TodolistsType }>>("todo-lists", {title})
    },
    deleteTodolist(toDoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListId}`)
    },
    UpdateTodolistTitle(toDoListId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${toDoListId}`, {title})
    },
    getTasks(todolistId: string) {
        const promise = instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType<{ item: TaskType }>>(
            `todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    deleteTask(toDoListID: string, taskId: string) {
        const promise = instance.delete<ResponseType<{item:TaskType}>>(`todo-lists/${toDoListID}/tasks/${taskId}`)
        return promise
    },
    UpdateTaskTitle(toDoListID: string,taskId: string,  model: taskDataType) {
        const promise = instance.put<ResponseType<{ item: taskDataType }>>(`todo-lists/${toDoListID}/tasks/${taskId}`, model)
        return promise
    }
}