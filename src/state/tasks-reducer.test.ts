import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../API/todolists-api";

/*test("correct task should be deleted from correct array", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        ],
        "toDoListId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ]
    }
    const action = removeTasksAC("2", "toDoListId2")
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId1"].length).toBe(3)
    expect(endState["toDoListId2"].length).toBe(2)
    expect(endState["toDoListId2"].every(t => t.id != "2")).toBeTruthy()
    expect(endState["toDoListId2"].every(t => t.id != "2")).toBe(true)
    expect(endState["toDoListId2"][0].id).toBe("1")
    expect(endState["toDoListId2"][1].id).toBe("3")
})
test("correct task should be added from correct array", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "toDoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
    const action = addTaskAC("juce", "toDoListId2")
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId1"].length).toBe(3)
    expect(endState["toDoListId2"].length).toBe(4)
    expect(endState["toDoListId2"][0].id).toBeDefined()
    expect(endState["toDoListId2"][0].title).toBe("juce")
    expect(endState["toDoListId2"][1].isDone).toBe(false)
})
test("status of specified task should be changed", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "toDoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
    const action = changeTaskStatusAC("2", false, "toDoListId2")
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId2"][1].status).toBe(TaskStatuses.New)
    /!*expect(endState["toDoListId2"][1]).toBeFalsy()*!/
    expect(endState["toDoListId1"][1]).toBeTruthy()
})
test("title of specified task should be changed", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "toDoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
    const action = changeTaskTitleAC("2", "way", "toDoListId2")
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId2"][1].title).toBe("way")
    expect(endState["toDoListId1"][1].title).toBe("JS")
})
test("new property with new array should be added when new todolist is added ", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "toDoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
    const action = addTodolistAC("title no matter")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "toDoListId1" && k != "toDoListId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test("property with todolistId should be deleted", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "toDoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
    const action = removeTodolistAC("toDoListId2")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["toDoListId2"]).toBeUndefined()
})*/

