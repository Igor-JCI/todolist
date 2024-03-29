import {tasksReducer, TaskStateType} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../../../API/types";
import {tasksActions} from "./index";
import {todolistsActions} from "./../index";

const {addTask, fetchTasks, removeTask, updateTask} = tasksActions
const {addTodolistTC, fetchToDoListTC, removeToDoListTC} = todolistsActions

let startState: TaskStateType = {}
beforeEach(() => {
    startState = {
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
})

test("correct task should be deleted from correct array", () => {
    const param = {taskId: "2", toDoListId: "toDoListId2"};
    const action = removeTask.fulfilled(param,"",param)
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId1"].length).toBe(3)
    expect(endState["toDoListId2"].length).toBe(2)
    expect(endState["toDoListId2"].every(t => t.id != "2")).toBeTruthy()
    expect(endState["toDoListId2"].every(t => t.id != "2")).toBe(true)
    expect(endState["toDoListId2"][0].id).toBe("1")
    expect(endState["toDoListId2"][1].id).toBe("3")
})
test("correct task should be added from correct array", () => {
    let task = {
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
    };
    const action = addTask.fulfilled(task, "", {title: task.title, toDoListId: task.todoListId})
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId1"].length).toBe(3)
    expect(endState["toDoListId2"].length).toBe(4)
    expect(endState["toDoListId2"][0].id).toBeDefined()
    expect(endState["toDoListId2"][0].title).toBe("juce")
    expect(endState["toDoListId2"][1].status).toBe(TaskStatuses.New)
})
test("status of specified task should be changed", () => {
    let updateModel = {
        taskId: "2",
        model: {
            status: TaskStatuses.New
        },
        toDoListId: "toDoListId2"
    };
    const action = updateTask.fulfilled(updateModel, "", updateModel)
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId2"][1].status).toBe(TaskStatuses.New)
    /*expect(endState["toDoListId2"][1]).toBeFalsy()*/
    /*expect(endState["toDoListId1"][1]).toBeTruthy()*/
})
test("title of specified task should be changed", () => {
    let updateModel = {taskId: "2", model: {title: "way"}, toDoListId: "toDoListId2"};
    const action = updateTask.fulfilled(updateModel, "", updateModel)
    const endState = tasksReducer(startState, action)

    expect(endState["toDoListId2"][1].title).toBe("way")
    expect(endState["toDoListId1"][1].title).toBe("JS")
})
test("new array should be added when new todolist is added ", () => {
    let payload = {
        todolist: {
            id: "toDoListId3",
            title: "title no matter",
            addedDate: "",
            order: 0
        }
    };
    const action = addTodolistTC.fulfilled(payload, "", payload.todolist.title)
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
    let payload = {id: "toDoListId2"};
    const action = removeToDoListTC.fulfilled(payload,"", payload.id)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["toDoListId2"]).toBeUndefined()
})
test("empty arrays should be added when we set todolist", () => {
    let payload = {
        todolists: [
            {id: "1", title: "title 1", addedDate: "", order: 0},
            {id: "2", title: "title 2", addedDate: "", order: 0}
        ]
    };
    const action = fetchToDoListTC.fulfilled(payload, "",undefined)
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
})
test("tasks should be added for todolist", () => {
    /*const action = setTasksAC({tasks: startState["toDoListId1"], todolistId: "toDoListId1"})*/

    const action = fetchTasks.fulfilled({
        tasks: startState["toDoListId1"],
        todolistId: "toDoListId1"
    }, "", "toDoListId1")

    const endState = tasksReducer({
        "toDoListId2": [],
        "toDoListId1": []
    }, action)

    expect(endState["toDoListId1"].length).toBe(3)
})

