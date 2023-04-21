import React, {ChangeEvent, useEffect, useState} from 'react'
import {toDoListsAPI} from "../API/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const getTDL = () => {
        toDoListsAPI.getToDoLists().then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <button onClick={getTDL}>Get ToDoList</button>
        </div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const createTDL = () => {
        toDoListsAPI.createToDoList(title).then((res) => {
            setState(res.data)
        })
    }
    const changeTitleTDL = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TDLTitle"} onChange={changeTitleTDL}/>
        <div>
            <button onClick={createTDL}>Create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [toDoListId, setToDoListId] = useState<string>("")
    const deleteTDL = () => {
        const tDLID = toDoListId
        toDoListsAPI.deleteTodolist(tDLID).then((res) => {
            setState(res.data)
        })
    }
    /*const changeTDLID = (e: ChangeEvent<HTMLInputElement>) => {
        setToDoListId(e.currentTarget.value)
    }*/
    const changeTDLID = (e: ChangeEvent<HTMLInputElement>) => setToDoListId(e.currentTarget.value)

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"toDoListId"} value={toDoListId} onChange={changeTDLID}/>
            <button onClick={deleteTDL}>DeleteTodolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [toDoListID, setToDoListID] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const updateTDL = () => {
        const tDLID = toDoListID
        const ttl = title
        toDoListsAPI.UpdateTodolistTitle(tDLID, ttl)
            .then((res) => {
                setState(res.data)
            })
    }

    const changeTDLTitle = (e:ChangeEvent<HTMLInputElement>) => setToDoListID(e.currentTarget.value)
    const changeTDLID = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"toDoListID"} value={toDoListID} onChange={changeTDLTitle}/>
            <input placeholder={"title"} value={title} onChange={changeTDLID}/>
            <button onClick={updateTDL}>Update</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const getTask = () => {
        const toDLId = todolistId
        toDoListsAPI.getTasks(toDLId).then((res) => {
            setState(res.data)
        })
    }
    const enterTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setTodolistId(value)
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={enterTodolistId}/>
            <button onClick={getTask}>Get Tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const createT = () => {
        toDoListsAPI.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"title"} onChange={changeTitle}/>
            <input placeholder={"todolistId"} onChange={changeTodolistId}/>
            <button onClick={createT}>Create Task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [toDoListID, setToDoListID] = useState<string>("")
    const deleteTask = () => {
        const tDListID = toDoListID
        const tId = taskId
        toDoListsAPI.deleteTask(tDListID, tId)
            .then((res) => {
                setState(res.data)
            })
    }

    const changeToDoListID = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setToDoListID(value)
    }
    const changeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setTaskId(value)
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"toDoListID"} value={toDoListID} onChange={changeToDoListID}/>
            <input placeholder={"taskId"} value={taskId} onChange={changeTaskId}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListID = "6405bb3e-0a77-4311-9ee8-107d1d210b02"
        const taskId = "8d467b4a-5cc6-4004-b89f-f7069c83f578"

        const title = "Hello"
        const description = "It is me"
        const completed = true
        const status = 0
        const priority = 1
        const startDate = null
        const deadline = null

        toDoListsAPI.UpdateTaskTitle(toDoListID, taskId, title,
            description,
            completed,
            status,
            priority,
            startDate,
            deadline)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}