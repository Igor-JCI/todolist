import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../API/todolists-api";
import {FilterValuesType, TodolistsDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";


type PropsType = {
    todolist: TodolistsDomainType
    tasks: Array<TaskType>
    removeTask: (id: string, toDoListId: string) => void
    changeFilter: (toDoListId: string, value: FilterValuesType) => void
    addTask: (text: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, toDoListId: string) => void
    removeToDoList: (toDoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, toDoListId: string) => void,
    changeTodolistTitle: (toDoListId: string, newTitle: string) => void,
    demo?: boolean
}
export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch: any = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "all")
    }, [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "active")
    }, [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "completed")
    }, [props.changeFilter, props.todolist.id])
    const removeToDoList = () => {
        props.removeToDoList(props.todolist.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.todolist.id, props.changeTodolistTitle])

    let tasksForTodolist = props.tasks
    console.log(props.todolist.filter)
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeToDoList} disabled={props.todolist.entityStatus === "loading"}><Delete></Delete></IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {
                    tasksForTodolist.map((t) => {
                            return <Task
                                removeTask={props.removeTask}
                                changeTaskStatus={props.changeTaskStatus}
                                changeTaskTitle={props.changeTaskTitle}
                                taskId={t.id}
                                todoListId={props.todolist.id}
                                status={t.status}
                                title={t.title}
                                key={t.id}
                            />
                        }
                    )
                }
            </div>
            <div>
                <Button color={"inherit"} variant={props.todolist.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.todolist.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.todolist.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

