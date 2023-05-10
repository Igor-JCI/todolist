import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchToDoListTC, FilterValuesType,
    removeTodolistAC, TodolistsDomainType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskStatuses, TaskType, toDoListsAPI} from "./API/todolists-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    console.log("App is called")
    const dispatch: any = useDispatch()
    const toDoLists = useSelector<AppRootState, Array<TodolistsDomainType>>(state => state.toDoLists)
    const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchToDoListTC())
    }, [])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, toDoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, status, toDoListId))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, toDoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, toDoListId))
    }, [dispatch])
    const addTask = useCallback((title: string, toDoListId: string) => {
        const action = addTaskAC(title, toDoListId)
        dispatch(action)
    }, [dispatch])
    const removeTask = useCallback((id: string, toDoListId: string) => {
        toDoListsAPI.deleteTask(id,toDoListId)
            .then ((res) => {
                dispatch()
                console.log(res)
            })

        /*const action = removeTasksAC(id, toDoListId)
        dispatch(action)*/
    }, [dispatch])
    const changeFilter = useCallback((toDoListId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(toDoListId, value))
    }, [dispatch])
    const removeToDoList = useCallback((toDoListId: string) => {
        const action = removeTodolistAC(toDoListId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        let toDoListId = v1()
        dispatch(addTodolistAC(title, toDoListId))
    }, [dispatch])
    const changeTodolistTitle = useCallback((toDoListId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(toDoListId, newTitle))
    }, [dispatch])
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                        key={tl.id}
                                        title={tl.title}
                                        id={tl.id}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeToDoList={removeToDoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


