import {Dispatch} from "redux";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from "./todolists-reducer";
import {taskDataType, TaskPriorities, TaskStatuses, TaskType, toDoListsAPI} from "../../API/todolists-api";
import {AppRootState} from "../../app/store";


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]:[action.task,...state[action.task.todoListId]]}
            /*const stateCopy = {...state}
            let tasks = stateCopy[action.task.todoListId]
            const newTask: TaskType = action.task
            const newTasks = [newTask, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy*/
        }
        case "REMOVE-TASK": {
            return {...state,[action.toDoListId]:state[action.toDoListId].filter(t => t.id !== action.taskId)}
            /*const stateCopy = {...state}
            const tasksArray = state[action.toDoListId]
            const filteredTasks = tasksArray.filter(t => t.id !== action.taskId)
            stateCopy[action.toDoListId] = filteredTasks
            return stateCopy*/
        }
        case "UPDATE-TASK": {
            return {...state,[action.toDoListId]: state[action.toDoListId].map(t => t.id === action.taskId ? {...t, ...action.model}: t)}
           /* let todoListTasks = state[action.toDoListId]
            state[action.toDoListId] = todoListTasks.map(t => t.id === action.taskId
                ? {...t, ...action.model} : t)
            return ({...state})*/
        }
        case "ADD-TODOLIST": {
            return {...state,[action.todolist.id]:[]}
            /*const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy*/
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]:action.tasks}
            /*const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy*/
        }
        default:
            return state
    }
}

//actions
export const removeTasksAC = (taskId: string, toDoListId: string) => ({
    type: "REMOVE-TASK", taskId, toDoListId
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK", task
} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, toDoListId: string) => ({
    type: "UPDATE-TASK", taskId, model, toDoListId
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: "SET-TASKS", tasks, todolistId
} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        toDoListsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const removeTaskTC = (toDoListId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        toDoListsAPI.deleteTask(toDoListId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTasksAC(taskId, toDoListId))
                }
            })
    }
}
export const addTaskTC = (title: string, toDoListId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        toDoListsAPI.createTask(toDoListId, title)
            .then((res) => {
                debugger
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, toDoListId: string) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[toDoListId].find((t) => t.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }
        const apiModel: taskDataType = {
            deadline: task.deadline,
            description: task.description,
            priority: TaskPriorities.Low,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        toDoListsAPI.UpdateTaskTitle(toDoListId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, domainModel, toDoListId))
            })
    }
}

//types
export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}
type ActionsType =
    | AddTodolistActionType
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

