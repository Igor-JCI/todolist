import {TaskStateType} from "../App";
import {addTodolistAC, TodolistsDomainType, toDoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {expect, test, beforeEach} from '@jest/globals';

test("ids should be equals", () => {
        const startTasksState: TaskStateType = {}
        const startTodolistsState: Array<TodolistsDomainType> = []

        const action = addTodolistAC({
            id: "kkkds",
            title: "Moscow",
            addedDate: "",
            order: 0
        })

        const endTasksState = tasksReducer(startTasksState, action)
        const endTodolistsState = toDoListsReducer(startTodolistsState, action)

        const keys = Object.keys(endTasksState)
        const idFromTasks = keys[0]
        const idFromTodolists = endTodolistsState[0].id

        expect(idFromTasks).toBe(action.todolist.id)
        expect(idFromTodolists).toBe(action.todolist.id)
    }
)
