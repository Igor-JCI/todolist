import {v1} from "uuid";
import {changeTodolistEntityStatusAC, FilterValuesType, setTodolistsAC, TodolistsDomainType} from "./todolists-reducer";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    toDoListsReducer
} from "./todolists-reducer";
import {RequestStatusType} from "../../app/app-reducer";

let toDoListId1: string
let toDoListId2: string
let startState: Array<TodolistsDomainType> = []
beforeEach(() => {
    toDoListId1 = v1()
    toDoListId2 = v1()
    startState = [
        {id: toDoListId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: toDoListId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "loading"}
    ]
})

test("correct todolist should be removed", () => {
        const endState = toDoListsReducer(startState, removeTodolistAC({id: toDoListId1}))

        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(toDoListId2)
    }
)
test("correct todolist should be added", () => {
        let newTodolistTitle = "New TodoList"
        const endState = toDoListsReducer(startState,
            addTodolistAC({
                todolist: {
                    id: toDoListId1,
                    title: newTodolistTitle,
                    addedDate: "",
                    order: 0
                }
            }))

        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe(newTodolistTitle)
        expect(endState[0].filter).toBe("all")
    }
)
test("correct todolist should change its name", () => {
        let newTodolistTitle = "New TodoList"
        let action = changeTodolistTitleAC({id: toDoListId2, title: newTodolistTitle})
        const endState = toDoListsReducer(startState, action)

        expect(endState[0].title).toBe("What to learn")
        expect(endState[1].title).toBe(newTodolistTitle)
    }
)
test("correct filter of todolist should be changed", () => {
        let newFilter: FilterValuesType = "completed"
        const action = changeTodolistFilterAC({id: toDoListId2, filter: newFilter})
        const endState = toDoListsReducer(startState, action)

        expect(endState[0].filter).toBe("all")
        expect(endState[1].filter).toBe(newFilter)
    }
)
test("todolists should be set to the state", () => {
        const action = setTodolistsAC({todolists: startState})
        const endState = toDoListsReducer([], action)

        expect(endState.length).toBe(2)
    }
)
test("correct entity status of todolist should be changed", () => {
        let newStatus: RequestStatusType = "loading"
        const action = changeTodolistEntityStatusAC({id: toDoListId2, status: newStatus})
        const endState = toDoListsReducer(startState, action)

        expect(endState[0].entityStatus).toBe("idle")
        expect(endState[1].entityStatus).toBe("loading")
    }
)