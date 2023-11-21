import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootState, useActions} from "../../app/store";
import {TodolistsDomainType} from "./todolists-reducer";
import {TaskStateType} from "./tasks-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {todolistsActions} from "./index";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const toDoLists = useSelector<AppRootState, Array<TodolistsDomainType>>(state => state.toDoLists)
    const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {addTodolistTC, fetchToDoListTC} = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchToDoListTC()
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolistTC}/>
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
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}