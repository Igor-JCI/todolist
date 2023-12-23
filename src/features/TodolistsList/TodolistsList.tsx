import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootState, useActions, useAppDispatch} from "../../app/store";
import {TodolistsDomainType} from "./Todolist/todolists-reducer";
import {TaskStateType} from "./Todolist/Task/tasks-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {tasksActions, todolistsActions} from "./index";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const toDoLists = useSelector<AppRootState, Array<TodolistsDomainType>>(state => state.toDoLists)
    const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {fetchToDoListTC} = useActions(todolistsActions)
    const dispatch = useAppDispatch()
    const addTodolistCallBack = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = todolistsActions.addTodolistTC(title)

        const resultAction = await dispatch(thunk)
        if (tasksActions.addTask.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError("Some error occured")
            }
        } else {
            helper.setTitle("")
        }
    }, [])

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
            <AddItemForm addItem={addTodolistCallBack}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap: "nowrap", overflowX: "scroll"}}>
            {
                toDoLists.map(tl => {
                    let allTodolistTasks = tasksObj[tl.id]
                    let tasksForTodolist = allTodolistTasks
                    return <Grid item>
                        <div style={{width: "300px"}}>
                            <Todolist
                                todolist={tl}
                                key={tl.id}
                                tasks={tasksForTodolist}
                                demo={demo}
                            />
                        </div>
                    </Grid>
                })
            }
        </Grid>
    </>
}