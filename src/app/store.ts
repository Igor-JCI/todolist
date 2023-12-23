import {ActionCreatorsMapObject, applyMiddleware, bindActionCreators, combineReducers, createStore} from "redux";
import {toDoListsReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/Todolist/Task/tasks-reducer";
import thunkMiddleWare from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

/*export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))*/

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare),

})

export type RootReducerType = typeof rootReducer
export type AppRootState = ReturnType<RootReducerType>

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()
    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
    return boundActions
}

// @ts-ignore
window.store = store