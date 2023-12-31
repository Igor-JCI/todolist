import {ResponseTasksType, ResponseType, taskDataType, TaskType, TodolistsType} from "./types";
import {instance} from "./instance";

//api
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
        const promise = instance.delete<ResponseType<{ item: TaskType }>>(`todo-lists/${toDoListID}/tasks/${taskId}`)
        return promise
    },
    UpdateTaskTitle(toDoListID: string, taskId: string, model: taskDataType) {
        const promise = instance.put<ResponseType<{ item: taskDataType }>>(`todo-lists/${toDoListID}/tasks/${taskId}`, model)
        return promise
    }
}

