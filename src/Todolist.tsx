import React from "react";

export type ArrayType = {
    id:number
    title:string
    isDone:boolean
}

type PropsType = {
    title: string
    tasks:Array<ArrayType>
    removeTask: Function
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map( t => <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {props.removeTask(t.id)}}>X</button>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}