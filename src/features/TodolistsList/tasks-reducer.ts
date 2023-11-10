import {Dispatch} from "redux";
import {taskDataType, TaskPriorities, TaskStatuses, TaskType, toDoListsAPI} from "../../API/todolists-api";
import {AppRootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

const initialState: TaskStateType = {}

//thunks
export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (param: { toDoListId: string, taskId: string }, thunkAPI) => {
    await toDoListsAPI.deleteTask(param.toDoListId, param.taskId)
    return ({taskId: param.taskId, toDoListId: param.toDoListId})
})
export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await toDoListsAPI.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks: res.data.items, todolistId}
})

export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: { title: string, toDoListId: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await toDoListsAPI.createTask(param.toDoListId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }


})

export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, toDoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
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
            ...model
        }
        toDoListsAPI.UpdateTaskTitle(toDoListId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, model, toDoListId}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, toDoListId: string }>) {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
    }
})
export const tasksReducer = slice.reducer
export const {updateTaskAC} = slice.actions

//types
export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}


