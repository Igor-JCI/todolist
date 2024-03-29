//types
export type  LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
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
export type FieldErrorType = { field: string, error: string };
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D,
    fieldsErrors?: Array<FieldErrorType>,
}
export type ResponseTasksType = {
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