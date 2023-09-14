import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "../../../../API/todolists-api";

type TaskPropsType = {
    removeTask: (id: string, toDoListId: string) => void,
    changeTaskStatus: (taskId: string, status:TaskStatuses, toDoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, toDoListId: string) => void,
    taskId: string
    todoListId: string
    status:TaskStatuses
    title: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.taskId, props.todoListId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.taskId, newValue, props.todoListId)
    },[props.changeTaskTitle,props.taskId,props.todoListId])
    return (
        <div key={props.taskId} className={props.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={props.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}><Delete></Delete></IconButton>
        </div>
    )
})

