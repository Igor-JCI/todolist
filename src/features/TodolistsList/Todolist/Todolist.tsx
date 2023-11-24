import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../API/todolists-api";
import {FilterValuesType, TodolistsDomainType} from "../todolists-reducer";
import {useActions} from "../../../app/store";
import {tasksActions, todolistsActions} from "../index";


type PropsType = {
    todolist: TodolistsDomainType
    tasks: Array<TaskType>
    demo?: boolean
}
export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const {changeTodolistFilter, removeToDoListTC, changeTodolistTitleTC} = useActions(todolistsActions)
    const {addTask, updateTask, removeTask, fetchTasks} = useActions(tasksActions)

    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasks(props.todolist.id)
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, toDoListId: string) => {
        updateTask({taskId, model: {status: status}, toDoListId})
    }, [])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, toDoListId: string) => {
        updateTask({taskId, model: {title: newTitle}, toDoListId})
    }, [])
    const onAllClickHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: "all"})
    }, [props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: "active"})
    }, [props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: "completed"})
    }, [props.todolist.id])
    const removeToDoList = () => {
        removeToDoListTC(props.todolist.id)
    }
    const addTaskCallBack = useCallback((title: string) => {
        addTask({title, toDoListId: props.todolist.id})
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

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeToDoList}
                            disabled={props.todolist.entityStatus === "loading"}><Delete></Delete></IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {
                    tasksForTodolist.map((t) => {
                            return <Task
                                removeTask={removeTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
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
                <FilterButton onClick={onAllClickHandler} selectedFilter = {props.todolist.filter}
                              buttonFilter = "all" color = 'inherit' text = "All"/>
                <FilterButton onClick={onAllClickHandler} selectedFilter = {props.todolist.filter}
                              buttonFilter = "active" color = 'primary' text = "Active"/>
                <FilterButton onClick={onAllClickHandler} selectedFilter = {props.todolist.filter}
                              buttonFilter = "completed" color = 'secondary' text = "Completed"/>
                {/*<Button color={"inherit"} variant={props.todolist.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.todolist.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.todolist.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>*/}
            </div>
        </div>
    )
})

type FilterButtonPropsType = {
    onClick: () => void
    selectedFilter: FilterValuesType,
    buttonFilter: FilterValuesType,
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    text: string
}

const FilterButton: React.FC<FilterButtonPropsType> = ({onClick, selectedFilter, buttonFilter, color,text}) => {
    return <Button color={color} variant={selectedFilter === buttonFilter ? "contained" : "text"}
                   onClick={onClick}>{text}
    </Button>
}
