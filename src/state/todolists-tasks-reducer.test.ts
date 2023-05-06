import {TaskStateType} from "../App";
import {addTodolistAC, TodolistsDomainType, toDoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {expect, test, beforeEach} from '@jest/globals';

test("ids should be equals", () => {
        const startTasksState: TaskStateType = {}
        const startTodolistsState: Array<TodolistsDomainType> = []

        const action = addTodolistAC("new todolist", "sls;s;s;")

        const endTasksState = tasksReducer(startTasksState, action)
        const endTodolistsState = toDoListsReducer(startTodolistsState, action)

        const keys = Object.keys(endTasksState)
        const idFromTasks = keys[0]
        const idFromTodolists = endTodolistsState[0].id

        expect(idFromTasks).toBe(action.toDoListId)
        expect(idFromTodolists).toBe(action.toDoListId)

    }
)
