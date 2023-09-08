import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskPriorities, TaskStatuses, TaskType} from "../API/todolists-api";
import {TodolistsDomainType} from "../features/TodolistsList/todolists-reducer";
import {FilterValuesType} from "../features/TodolistsList/todolists-reducer";

/*export const Counter = () => {
    debugger
    console.log("rendering")
    let arr = useState(5)
    let data = arr[0]
    let setData = arr[1]

    return (
        <div onClick={() => {
            setData(data - 1)
        }}>{data}</div>
    )
}*/
/*export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}*/

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let toDoListId1 = v1()
    let toDoListId2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<TodolistsDomainType>>([])
    let [tasksObj, setTasks] = useState<TaskStateType>({
        [toDoListId1]: [],
        [toDoListId2]: []
    })

    const changeStatus = (taskId: string, status: TaskStatuses, toDoListId: string) => {
        let tasks = tasksObj[toDoListId]
        let task = tasks.find(t => t.id == taskId)
        if (task) {
            task.status = status
            setTasks({...tasksObj})
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, toDoListId: string) => {
        //Достаем нужный массив по айди тудулиста
        let tasks = tasksObj[toDoListId]
        // Достаем нужную таску по айди
        let task = tasks.find(t => t.id == taskId)
        // Достем название таски и меняем его
        if (task) {
            task.title = newTitle
            // засетаем в стейт копию объекта, чтобы Реакт отреагировал перерисовкой
            setTasks({...tasksObj})
        }
    }
    const addTask = (title: string, toDoListId: string) => {
        let task = {
            id: v1(), title: title, status: TaskStatuses.New, todoListId: toDoListId, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        }
        let tasks = tasksObj[toDoListId]
        let newTasks = [task, ...tasks]
        tasksObj[toDoListId] = newTasks
        setTasks({...tasksObj})
    }
    const changeFilter = (toDoListId: string, value: FilterValuesType) => {
        let todolist = toDoLists.find(tl => tl.id === toDoListId)
        if (todolist) {
            todolist.filter = value
            setToDoLists([...toDoLists])
        }
    }
    const removeTask = (id: string, toDoListId: string) => {
        let tasks = tasksObj[toDoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[toDoListId] = filteredTasks
        setTasks({...tasksObj})
    }
    const removeToDoList = (toDoListId: string) => {
        let filteredToDoList = toDoLists.filter(t => t.id !== toDoListId)
        setToDoLists(filteredToDoList)
        delete tasksObj[toDoListId]
        setTasks({...tasksObj})
    }
    const addTodolist = (title: string) => {
        let todolist: TodolistsDomainType = {
            id: v1(), title: title, filter: "all", addedDate: "",entityStatus:"idle",
            order: 0
        }
        setToDoLists([todolist, ...toDoLists])
        setTasks({...tasksObj, [todolist.id]: []})
    }
    const changeTodolistTitle = (newTitle: string, toDoListId: string) => {
        let td = toDoLists.find(tl => tl.id === toDoListId)
        if (td) {
            td.title = newTitle
            setToDoLists([...toDoLists])
        }

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
                                        todolist={tl}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
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


export default App;
