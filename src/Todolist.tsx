import React from "react";
import {FilterValuesType} from "./App";

export type ArrayType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<ArrayType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (text: string) => void

}

export const Todolist = (props: PropsType) => {
    let elementToAddTasks = React.createRef <HTMLInputElement>()


    const addTasks = () => {

        let text = elementToAddTasks.current?.value
        if (text) {
            props.addTask(text)
        }

    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>

                <input ref={elementToAddTasks}/>
                <button onClick={addTasks}>+</button>

            </div>
            <ul>
                {
                    props.tasks.map(t => <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTask(t.id)
                        }}>X
                        </button>
                    </li>)
                }

                {/*{
                    props.tasks.map((t) => {
                       return (
                           <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span></li>
                       )
                    })
                }*/}

                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>

                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>

                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}