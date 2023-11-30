import React, {useCallback, useEffect} from "react";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton, Paper} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../API/todolists-api";
import {FilterValuesType, TodolistsDomainType} from "../todolists-reducer";
import {useActions, useAppDispatch} from "../../../app/store";
import {tasksActions, todolistsActions} from "../index";
import {authActions} from "../../Auth";
import {loginTC} from "../../Auth/auth-reducer";
import any = jasmine.any;


export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const {changeTodolistFilter, removeToDoListTC, changeTodolistTitleTC} = useActions(todolistsActions)
    const {fetchTasks} = useActions(tasksActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasks(props.todolist.id)
    }, [])

    const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) => {
        changeTodolistFilter({id: props.todolist.id, filter})
    }, [props.todolist.id])
    const removeToDoList = () => {
        removeToDoListTC(props.todolist.id)
    }
    const addTaskCallBack = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = tasksActions.addTask({title, toDoListId: props.todolist.id})

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

    }, [props.todolist.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        changeTodolistTitleTC({toDoListId: props.todolist.id, newTitle})
    }, [props.todolist.id])

    let tasksForTodolist = props.tasks
    console.log(props.todolist.filter)
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const renderFilterButton = (buttonFilter: FilterValuesType,
                                color: ColorPropsType,
                                text: string) => {
        return <Button color={color} variant={props.todolist.filter === buttonFilter ? "contained" : "text"}
                       onClick={() => onFilterButtonClickHandler(buttonFilter)}>{text}
        </Button>
    }

    return (
        <Paper style={{padding: "10px", position: "relative"}}>

            <IconButton onClick={removeToDoList}
                        size={"small"}
                        disabled={props.todolist.entityStatus === "loading"}
                        style={{position: "absolute", right: "0px", top: "0px"}}
            ><Delete fontSize={"small"}/></IconButton>

            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
            </h3>
            <AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {
                    tasksForTodolist.map((t) => {
                            return <Task
                                taskId={t.id}
                                todoListId={props.todolist.id}
                                status={t.status}
                                title={t.title}
                                key={t.id}
                            />
                        }
                    )
                }
                {!tasksForTodolist.length && <div style={{padding: "10px", color: "grey"}}>No task</div>}
            </div>
            <div>
                {renderFilterButton("all", 'inherit', "All")}
                {renderFilterButton("active", 'primary', "Active")}
                {renderFilterButton("completed", 'secondary', "Completed")}
            </div>
        </Paper>
    )
})

type ColorPropsType = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
type PropsType = {
    todolist: TodolistsDomainType
    tasks: Array<TaskType>
    demo?: boolean
}
