import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchToDoListTC,
    FilterValuesType,
    removeToDoListTC,
    TodolistsDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../API/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch: any = useDispatch()
    const toDoLists = useSelector<AppRootState, Array<TodolistsDomainType>>(state => state.toDoLists)
    const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchToDoListTC())
    }, [])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, toDoListId: string) => {
        dispatch(updateTaskTC({taskId, model: {status: status}, toDoListId}))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, toDoListId: string) => {
        dispatch(updateTaskTC({taskId, model: {title: newTitle}, toDoListId}))
        /* dispatch(changeTaskTitleAC(taskId, newTitle, toDoListId))*/
    }, [dispatch])
    const addTask = useCallback((title: string, toDoListId: string) => {
        dispatch(addTaskTC({title, toDoListId}))
    }, [dispatch])
    const removeTask = useCallback((taskId: string, toDoListId: string) => {
        dispatch(removeTaskTC({toDoListId, taskId}))
    }, [dispatch])
    const changeFilter = useCallback((toDoListId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: toDoListId, filter: value}))
    }, [dispatch])
    const removeToDoList = useCallback((toDoListId: string) => {
        dispatch(removeToDoListTC(toDoListId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodolistTitle = useCallback((toDoListId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC({toDoListId, newTitle}))
    }, [dispatch])

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