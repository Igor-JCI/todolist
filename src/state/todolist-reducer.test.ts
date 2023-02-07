import {v1} from "uuid";
import {FilterValuesType, ToDoListType} from "../App";
import {
    addTodolistAC, changeTodolistFilterAC,
    ChangeTodolistFilterActionType, changeTodolistTitleAC,
    ChangeTodolistTitleActionType,
    removeTodolistAC,
    toDoListsReducer
} from "./todolists-reducer";

test("correct todolist should be removed", () => {
        let toDoListId1 = v1()
        let toDoListId2 = v1()
        const startState: Array<ToDoListType> = [
            {id: toDoListId1, title: "What to learn", filter: "all"},
            {id: toDoListId2, title: "What to buy", filter: "all"}
        ]
        const endState = toDoListsReducer(startState,
            removeTodolistAC(toDoListId1))

        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(toDoListId2)
    }
)
test("correct todolist should be added", () => {
        let toDoListId1 = v1()
        let toDoListId2 = v1()
        let newTodolistTitle = "New TodoList"
        const startState: Array<ToDoListType> = [
            {id: toDoListId1, title: "What to learn", filter: "all"},
            {id: toDoListId2, title: "What to buy", filter: "all"}
        ]
        const endState = toDoListsReducer(startState,
            addTodolistAC(newTodolistTitle))

        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe(newTodolistTitle)
        expect(endState[0].filter).toBe("all")
    }
)
test("correct todolist should change its name", () => {
        let toDoListId1 = v1()
        let toDoListId2 = v1()
        let newTodolistTitle = "New TodoList"
        const startState: Array<ToDoListType> = [
            {id: toDoListId1, title: "What to learn", filter: "all"},
            {id: toDoListId2, title: "What to buy", filter: "all"}
        ]
        let action = changeTodolistTitleAC(toDoListId2, newTodolistTitle)
        const endState = toDoListsReducer(startState, action)

        expect(endState[0].title).toBe("What to learn")
        expect(endState[1].title).toBe(newTodolistTitle)
    }
)
test("correct filter of todolist should be changed", () => {
        let toDoListId1 = v1()
        let toDoListId2 = v1()
        let newFilter: FilterValuesType = "completed"
        const startState: Array<ToDoListType> = [
            {id: toDoListId1, title: "What to learn", filter: "all"},
            {id: toDoListId2, title: "What to buy", filter: "all"}
        ]
        const action = changeTodolistFilterAC(toDoListId2,newFilter)
        const endState = toDoListsReducer(startState, action)

        expect(endState[0].filter).toBe("all")
        expect(endState[1].filter).toBe(newFilter)
    }
)