import React, {useState} from 'react';
import './App.css';
import {ArrayType, Todolist} from "./Todolist";
import {v1} from "uuid";


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


function App() {
    /*let initTasks: Array<ArrayType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]
    let [tasks, setTasks] = useState(initTasks)*/


    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const addTask = (text: string) => {

        let newTask = {
            id: v1(),
            title: text,
            isDone: false
        }

        let newTasks = [newTask,...tasks]
        setTasks(newTasks)
    }
    let [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const removeTask = (id: string) => {
        debugger
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
        /*let resultTask = tasks.filter((t) => {
            return t.id !== id
        })*/

        /*  let resultTask = tasks.filter((t) => {
              if (t.id !== id) {
                  return true
              }
              else {
                  return false
              }
          })*/

    }

    let tasksForTodolist = tasks
    if (filter === "completed") {
        tasksForTodolist = tasks.filter((t) => {
            if (t.isDone === true) {
                return true
            }
        })
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />

        </div>
    );
}

export default App;
