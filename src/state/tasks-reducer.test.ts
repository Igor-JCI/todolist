import {TaskStateType} from "../App";
import {
    addTaskAC,
    updateTaskAC,
    changeTaskTitleAC,
    removeTasksAC,
    setTasksAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../API/todolists-api";


test("correct task should be deleted from correct array", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        "toDoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
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
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        "toDoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    }
    const action = addTaskAC({
        addedDate: "",
        deadline: "",
        description: "",
        id: "ddldlmm4566",
        order: 0,
        priority: 0,
        startDate: "",
        status: TaskStatuses.New,
        title: "juce",
        todoListId: "toDoListId2"

    })
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId1"].length).toBe(3)
    expect(endState["toDoListId2"].length).toBe(4)
    expect(endState["toDoListId2"][0].id).toBeDefined()
    expect(endState["toDoListId2"][0].title).toBe("juce")
    expect(endState["toDoListId2"][1].status).toBe(TaskStatuses.New)
})
test("status of specified task should be changed", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        "toDoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    }
    const action = updateTaskAC("2", {
        title: "lsl;",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: ""
    }, "toDoListId2")
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId2"][1].status).toBe(TaskStatuses.New)
    /*expect(endState["toDoListId2"][1]).toBeFalsy()*/
    expect(endState["toDoListId1"][1]).toBeTruthy()
})
test("title of specified task should be changed", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        "toDoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
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
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        "toDoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    }
    const action = addTodolistAC({
        id: "toDoListId3",
        title: "title no matter",
        addedDate: "",
        order: 0
    })
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
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        "toDoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    }
    const action = removeTodolistAC("toDoListId2")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["toDoListId2"]).toBeUndefined()
})
test("empty arrays should be added when we set todolist", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        "toDoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    }

    const action = setTodolistsAC([
        {id: "1", title: "title 1", addedDate: "", order: 0},
        {id: "2", title: "title 2", addedDate: "", order: 0}
    ])
    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
})
test("tasks should be added for todolist", () => {
    const startState: TaskStateType = {
        "toDoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "toDoListId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        "toDoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "toDoListId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    }

    const action = setTasksAC(startState["toDoListId1"], "toDoListId1")
    const endState = tasksReducer({
        "toDoListId2": [],
        "toDoListId1": []
    }, action)

    expect(endState["toDoListId1"].length).toBe(3)
})

