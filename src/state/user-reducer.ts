type StateType = {
    age: number,
    childrenCount: number,
    name: string
}
type ActionType = {
    type: string,
    [key: string]: any
}
type CommonType = ActionType|ACT

export const userReducer = (state: StateType, action: CommonType): StateType => {

    switch (action.type) {
        case "INCREMENT-AGE":
            let newState = {...state}
            newState.age = state.age + 1
            return newState
        case "INCREMENT-CHILDREN-COUNT":
            return {...state, childrenCount: state.childrenCount + 1}
        /*let nState = {...state}
        nState.childrenCount = state.childrenCount + 1
        return nState*/
        case "CHANGE-NAME":
            let copyState = {...state}
            copyState.name = action.newName
            return copyState
        default:
            throw new Error("no action")
    }
}
type ACT = {
    type: string,
    newName: string
}
const AC = (name: string): ACT => ({
    type: "CHANGE-NAME",
    newName: name
})
AC("Viktor")