import React, {useState} from 'react';
import './App.css';
import {ArrayType, Todolist} from "./Todolist";


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

function App() {
    /*let initTasks: Array<ArrayType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]
    let [tasks, setTasks] = useState(initTasks)*/


    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])

    const removeTask = (id: number) => {
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

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />

        </div>
    );
}

export default App;
