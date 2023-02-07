import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {AppBar, Button, Checkbox, IconButton, Toolbar, Typography} from "@mui/material";
import {Delete, Menu} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, toDoListId: string) => void
    changeFilter: (toDoListId: string, value: FilterValuesType) => void
    addTask: (text: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    filter: FilterValuesType,
    id: string,
    removeToDoList: (toDoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, toDoListId: string) => void,
    changeTodolistTitle: (toDoListId: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {

    const onAllClickHandler = () => {
        props.changeFilter(props.id, "all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, "active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, "completed")
    }
    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeToDoList}><Delete></Delete></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map((t) => {
                            const onRemoveHandler = () => {
                                props.removeTask(t.id, props.id)
                            }
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id)
                            }

                            return (
                                <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                    <Checkbox checked={t.isDone} onChange={onChangeStatusHandler}/>
                                    {/*<input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>*/}
                                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                    {/*<button onClick={onRemoveHandler}>X</button>*/}
                                    <IconButton onClick={onRemoveHandler}><Delete></Delete></IconButton>
                                </div>
                            )
                        }
                    )
                }
            </div>
            <div>
                <Button color={"inherit"} variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
                {/*<button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>*/}
            </div>
        </div>
    )
}

