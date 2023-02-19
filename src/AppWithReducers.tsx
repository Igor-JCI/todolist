import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    toDoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"
export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let toDoListId1 = v1()
    let toDoListId2 = v1()
    let [toDoLists, dispatchToToDolListsReducer] = useReducer(toDoListsReducer, [
        {id: toDoListId1, title: "What to learn", filter: "all"},
        {id: toDoListId2, title: "What to buy", filter: "all"}
    ])
    let [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [toDoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [toDoListId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ]
    })

    const changeStatus = (taskId: string, isDone: boolean, toDoListId: string) => {
        dispatchToTaskReducer(changeTaskStatusAC(taskId, isDone, toDoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, toDoListId: string) => {
        dispatchToTaskReducer(changeTaskTitleAC(taskId, newTitle, toDoListId))
        /*//Достаем нужный массив по айди тудулиста
        let tasks = tasksObj[toDoListId]
        // Достаем нужную таску по айди
        let task = tasks.find(t => t.id == taskId)
        // Достем название таски и меняем его
        if (task) {
            task.title = newTitle
            // засетаем в стейт копию объекта, чтобы Реакт отреагировал перерисовкой
            setTasks({...tasksObj})
        }*/
    }
    const addTask = (title: string, toDoListId: string) => {
        const action = addTaskAC(title, toDoListId)
        dispatchToTaskReducer(action)
        /* let task = {id: v1(), title: title, isDone: false}
         let tasks = tasksObj[toDoListId]
         let newTasks = [task, ...tasks]
         tasksObj[toDoListId] = newTasks
         setTasks({...tasksObj})*/
    }
    const removeTask = (id: string, toDoListId: string) => {
        const action = removeTasksAC(id, toDoListId)
        dispatchToTaskReducer(action)
    }

    const changeFilter = (toDoListId: string, value: FilterValuesType) => {
        dispatchToToDolListsReducer(changeTodolistFilterAC(toDoListId, value))
        /*let todolist = toDoLists.find(tl => tl.id === toDoListId)
        if (todolist) {
            todolist.filter = value
            setToDoLists([...toDoLists])
        }*/
    }
    const removeToDoList = (toDoListId: string) => {
        const action = removeTodolistAC(toDoListId)
        dispatchToToDolListsReducer(action)
        dispatchToTaskReducer(action)
        /*let filteredToDoList = toDoLists.filter(t => t.id !== toDoListId)
        setToDoLists(filteredToDoList)
        delete tasksObj[toDoListId]
        setTasks({...tasksObj})*/
    }
    const addTodolist = (title: string) => {
        let toDoListId = v1()
        dispatchToTaskReducer(addTodolistAC(title, toDoListId))
        dispatchToToDolListsReducer(addTodolistAC(title, toDoListId))
        /* let todolist: ToDoListType = {id: v1(), title: title, filter: "all"}
         setToDoLists([todolist, ...toDoLists])
         setTasks({...tasksObj, [todolist.id]: []})*/
    }
    const changeTodolistTitle = (toDoListId: string, newTitle: string) => {
        dispatchToToDolListsReducer(changeTodolistTitleAC(toDoListId, newTitle))
        /*let td = toDoLists.find(tl => tl.id === toDoListId)
        if (td) {
            td.title = newTitle
            setToDoLists([...toDoLists])
        }*/
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        toDoLists.map(tl => {
                            let tasksForTodolist = tasksObj[tl.id]
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksObj[tl.id].filter((t) => {
                                    if (t.isDone === true) {
                                        return true
                                    }
                                })
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        title={tl.title}
                                        id={tl.id}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeToDoList={removeToDoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
