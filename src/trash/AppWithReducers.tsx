import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    toDoListsReducer
} from "../features/TodolistsList/todolists-reducer";
import {addTaskAC, updateTaskAC, removeTasksAC, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../API/todolists-api";


/*function AppWithReducers() {
    let toDoListId1 = v1()
    let toDoListId2 = v1()
    let [toDoLists, dispatchToToDolListsReducer] = useReducer(toDoListsReducer, [
        {
            id: toDoListId1, title: "What to learn", filter: "all", addedDate: "",
            order: 0
        },
        {
            id: toDoListId2, title: "What to buy", filter: "all", addedDate: "",
            order: 0
        }
    ])
    let [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [toDoListId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: toDoListId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: toDoListId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ],
        [toDoListId2]: [
            {
                id: v1(), title: "Book", status: TaskStatuses.Completed, todoListId: toDoListId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: toDoListId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ]
    })
    const changeStatus = (taskId: string, status: TaskStatuses, toDoListId: string) => {
        dispatchToTaskReducer(updateTaskAC(taskId, {status}, toDoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, toDoListId: string) => {
        dispatchToTaskReducer(updateTaskAC(taskId, {title: newTitle}, toDoListId))
    }
    const addTask = (title: string, toDoListId: string) => {
        const action = addTaskAC({
            addedDate: "",
            deadline: "",
            description: "",
            id: "ddldlmm4566",
            order: 0,
            priority: 0,
            startDate: "",
            status: TaskStatuses.New,
            title: title,
            todoListId: toDoListId
        })
        dispatchToTaskReducer(action)
    }
    const removeTask = (id: string, toDoListId: string) => {
        const action = removeTasksAC(id, toDoListId)
        dispatchToTaskReducer(action)
    }

    const changeFilter = (toDoListId: string, value: FilterValuesType) => {
        dispatchToToDolListsReducer(changeTodolistFilterAC(toDoListId, value))
    }
    const removeToDoList = (toDoListId: string) => {
        const action = removeTodolistAC(toDoListId)
        dispatchToToDolListsReducer(action)
        dispatchToTaskReducer(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC({
            id: v1(),
            addedDate: "",
            order: 0,
            title: title
        })
        dispatchToTaskReducer(action)
        dispatchToToDolListsReducer(action)
    }
    const changeTodolistTitle = (toDoListId: string, newTitle: string) => {
        dispatchToToDolListsReducer(changeTodolistTitleAC(toDoListId, newTitle))
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
                                    if (t.status === TaskStatuses.Completed) {
                                        return true
                                    }
                                })
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksObj[tl.id].filter(t => t.status === TaskStatuses.New)
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
}*/

/*export default AppWithReducers;*/
