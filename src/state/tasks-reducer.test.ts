import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./tasks-reducer";

test("correct task should be deleted from correct array", () => {
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
    const action = removeTasksAC("2", "toDoListId2" )
    const endState = tasksReducer (startState,action)

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
    const action = addTaskAC("juce", "toDoListId2" )
    const endState = tasksReducer (startState,action)

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
    const action = changeTaskStatusAC("2",false, "toDoListId2" )
    const endState = tasksReducer (startState,action)

    expect(endState["toDoListId2"][1].isDone).toBe(false)
    /*expect(endState["toDoListId2"][1]).toBeFalsy()*/
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
    const action = changeTaskTitleAC("2","way", "toDoListId2" )
    const endState = tasksReducer (startState,action)

    expect(endState["toDoListId2"][1].title).toBe("way")
    expect(endState["toDoListId1"][1].title).toBe("JS")
})
