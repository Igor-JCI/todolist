import {TodolistsDomainType, toDoListsReducer} from "./Todolist/todolists-reducer";
import {tasksReducer, TaskStateType} from "./Todolist/Task/tasks-reducer";
import {todolistsActions} from "./../TodolistsList/Todolist/index";
const {addTodolistTC} = todolistsActions

test("ids should be equals", () => {
        const startTasksState: TaskStateType = {}
        const startTodolistsState: Array<TodolistsDomainType> = []
    let payload = {
        todolist: {
            id: "kkkds",
            title: "Moscow",
            addedDate: "",
            order: 0
        }
    };
    const action = addTodolistTC.fulfilled(payload, "", payload.todolist.title)

        const endTasksState = tasksReducer(startTasksState, action)
        const endTodolistsState = toDoListsReducer(startTodolistsState, action)

        const keys = Object.keys(endTasksState)
        const idFromTasks = keys[0]
        const idFromTodolists = endTodolistsState[0].id

        expect(idFromTasks).toBe(action.payload.todolist.id)
        expect(idFromTodolists).toBe(action.payload.todolist.id)
    }
)
