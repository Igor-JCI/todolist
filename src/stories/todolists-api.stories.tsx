import React, {useEffect, useState} from 'react'
import {toDoListsAPI} from "../API/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.getToDoLists().then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.createToDoList("title").then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListID = "6a6fa290-3bb1-4f79-9e42-48b85e497504"
        toDoListsAPI.deleteTodolist(toDoListID).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListID = "6405bb3e-0a77-4311-9ee8-107d1d210b02"
        toDoListsAPI.UpdateTodolistTitle(toDoListID, "google")
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

