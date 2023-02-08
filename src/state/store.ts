import {combineReducers, createStore} from "redux";
import {toDoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer)


// @ts-ignore
window.store = store