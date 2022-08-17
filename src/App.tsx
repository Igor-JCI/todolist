import React from 'react';
import './App.css';
import {ArrayType, Todolist} from "./Todolist";

function App() {
    let tasks1: Array<ArrayType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]
    let tasks2: Array<ArrayType> = [
        {id: 1, title: "Hello word", isDone: true},
        /*{id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo ", isDone: false}*/
    ]
    return (
        <div className="App">
            <Todolist title="What to learn" tasks = {tasks1}/>
            <Todolist title="Songs" tasks = {tasks2}/>
        </div>
    );
}

export default App;
