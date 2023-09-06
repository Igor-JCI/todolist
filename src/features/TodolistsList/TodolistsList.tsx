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

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo=false}) => {
    const dispatch: any = useDispatch()
    const toDoLists = useSelector<AppRootState, Array<TodolistsDomainType>>(state => state.toDoLists)
    const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchToDoListTC())
    }, [])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, toDoListId: string) => {
        dispatch(updateTaskTC(taskId, {status: status}, toDoListId))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, toDoListId: string) => {
        dispatch(updateTaskTC(taskId, {title: newTitle}, toDoListId))
        /* dispatch(changeTaskTitleAC(taskId, newTitle, toDoListId))*/
    }, [dispatch])
    const addTask = useCallback((title: string, toDoListId: string) => {
        dispatch(addTaskTC(title, toDoListId))
    }, [dispatch])
    const removeTask = useCallback((id: string, toDoListId: string) => {
        dispatch(removeTaskTC(toDoListId, id))
    }, [dispatch])
    const changeFilter = useCallback((toDoListId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(toDoListId, value))
    }, [dispatch])
    const removeToDoList = useCallback((toDoListId: string) => {
        dispatch(removeToDoListTC(toDoListId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodolistTitle = useCallback((toDoListId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(toDoListId, newTitle))
    }, [dispatch])
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