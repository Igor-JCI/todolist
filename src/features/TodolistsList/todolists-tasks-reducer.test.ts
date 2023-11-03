import {addTodolistAC, TodolistsDomainType, toDoListsReducer} from "./todolists-reducer";
import {tasksReducer, TaskStateType} from "./tasks-reducer";

test("ids should be equals", () => {
        const startTasksState: TaskStateType = {}
        const startTodolistsState: Array<TodolistsDomainType> = []
        const action = addTodolistAC({
            todolist: {
                id: "kkkds",
                title: "Moscow",
                addedDate: "",
                order: 0
            }
        })

        const endTasksState = tasksReducer(startTasksState, action)
        const endTodolistsState = toDoListsReducer(startTodolistsState, action)

        const keys = Object.keys(endTasksState)
        const idFromTasks = keys[0]
        const idFromTodolists = endTodolistsState[0].id

        expect(idFromTasks).toBe(action.payload.todolist.id)
        expect(idFromTodolists).toBe(action.payload.todolist.id)
    }
)
