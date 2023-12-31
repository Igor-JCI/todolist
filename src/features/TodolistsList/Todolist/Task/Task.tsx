import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "../../../../API/types";
import {tasksActions, todolistsActions} from "../../index";
import {useActions} from "../../../../utils/redux-utils";

type TaskPropsType = {
    taskId: string
    todoListId: string
    status: TaskStatuses
    title: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const {updateTask, removeTask} = useActions(tasksActions)
    const onRemoveHandler = () => {
        removeTask({taskId: props.taskId, toDoListId: props.todoListId})
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            taskId: props.taskId,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            toDoListId: props.todoListId
        })
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        updateTask({taskId: props.taskId, model: {title: newValue}, toDoListId: props.todoListId})
    }, [updateTask, props.taskId, props.todoListId])
    return (
        <div key={props.taskId} className={props.status === TaskStatuses.Completed ? "is-done" : ""}
             style={{position: "relative"}}>
            <Checkbox checked={props.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            <IconButton size={"small"} onClick={onRemoveHandler} style={{position: "absolute", top: "2px", right: "2px"}}><Delete
                fontSize={"small"}/></IconButton>
        </div>
    )
})

