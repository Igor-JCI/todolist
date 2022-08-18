import React, {useState} from 'react';
import './App.css';
import {ArrayType, Todolist} from "./Todolist";

function App() {
    let tasks: Array<ArrayType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]



    const removeTask = (id: number) => {

        tasks = tasks.filter(t => t.id !== id)
        debugger
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
