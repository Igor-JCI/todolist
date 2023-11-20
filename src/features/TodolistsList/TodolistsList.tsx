import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useActions} from "../../app/store";
import {
    changeTodolistFilterAC,
    FilterValuesType,
    TodolistsDomainType
} from "./todolists-reducer";
import {TaskStateType} from "./tasks-reducer";
import {TaskStatuses} from "../../API/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {tasksActions, todolistsActions} from "./index";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch: any = useDispatch()
    const toDoLists = useSelector<AppRootState, Array<TodolistsDomainType>>(state => state.toDoLists)
    const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {updateTaskTC, removeTaskTC, addTaskTC} = useActions(tasksActions)
    const {addTodolistTC, changeTodolistTitleTC, fetchToDoListTC, removeToDoListTC} = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchToDoListTC()
    }, [])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, toDoListId: string) => {
        updateTaskTC({taskId, model: {status: status}, toDoListId})
    }, [])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, toDoListId: string) => {
        updateTaskTC({taskId, model: {title: newTitle}, toDoListId})
    }, [])
    const addTask = useCallback((title: string, toDoListId: string) => {
        addTaskTC({title, toDoListId})
    }, [])
    const removeTask = useCallback((taskId: string, toDoListId: string) => {
        removeTaskTC({toDoListId, taskId})
    }, [])
    const changeFilter = useCallback((toDoListId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: toDoListId, filter: value}))
    }, [dispatch])
    const removeToDoList = useCallback((toDoListId: string) => {
        removeToDoListTC(toDoListId)
    }, [])
    const addTodolist = useCallback((title: string) => {
        addTodolistTC(title)
    }, [])
    const changeTodolistTitle = useCallback((toDoListId: string, newTitle: string) => {
        changeTodolistTitleTC({toDoListId, newTitle})
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                toDoLists.map(tl => {
                    let allTodolistTasks = tasksObj[tl.id]
                    let tasksForTodolist = allTodolistTasks
                    return <Grid item>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                todolist={tl}
                                key={tl.id}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeToDoList={removeToDoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}