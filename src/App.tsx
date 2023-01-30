import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
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
export type FilterValuesType = "all" | "active" | "completed"
export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    /*let initTasks: Array<ArrayType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]
    let [tasks, setTasks] = useState(initTasks)*/
    /*let [filter, setFilter] = useState<FilterValuesType>("all")*/
    let toDoListId1 = v1()
    let toDoListId2 = v1()
    let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListId1, title: "What to learn", filter: "all"},
        {id: toDoListId2, title: "What to buy", filter: "all"}
    ])
    let [tasksObj, setTasks] = useState<TaskStateType>({
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
        let tasks = tasksObj[toDoListId]
        let task = tasks.find(t => t.id == taskId)
        if (task) {
            task.isDone = isDone
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
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[toDoListId]
        let newTasks = [task, ...tasks]
        tasksObj[toDoListId] = newTasks
        setTasks({...tasksObj})
    }
    const changeFilter = (value: FilterValuesType, toDoListId: string) => {
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
        let todolist: ToDoListType = {id: v1(), title: title, filter: "all"}
        setToDoLists([todolist, ...toDoLists])
        setTasks({...tasksObj, [todolist.id]: []})
    }
    const changeTodolistTitle = (newTitle: string, toDoListId: string) => {
        let td = toDoLists.find(tl => tl.id === toDoListId)
        if (td) {
            td.title = newTitle
            setToDoLists ([...toDoLists])
        }

    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            {toDoLists.map(tl => {
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

                return <Todolist
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
                    changeTodolistTitle={changeTodolistTitle}/>
            })}
            {/*<Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />*/}
        </div>
    );
}

export default App;
