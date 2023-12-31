import {asyncAction as tasksAsyncActions, tasksReducer} from "./tasks-reducer"

const tasksActions = {
    ...tasksAsyncActions
}

export {
    tasksActions,
    tasksReducer
}