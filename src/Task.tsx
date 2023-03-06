import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
    removeTask: (id: string, toDoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, toDoListId: string) => void,
    taskId: string
    todoListId: string
    isDone: boolean
    title: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.taskId, props.todoListId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.taskId, e.currentTarget.checked, props.todoListId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.taskId, newValue, props.todoListId)
    },[props.changeTaskTitle,props.taskId,props.todoListId])
    return (
        <div key={props.taskId} className={props.isDone ? "is-done" : ""}>
            <Checkbox checked={props.isDone} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}><Delete></Delete></IconButton>
        </div>
    )
})