import {applicationReducer, InitialStateType, setAppError, setAppStatus} from "./application-reducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: true
    }
})

test("correct error message should be set", () => {
        const endState = applicationReducer(startState, setAppError({error: "some error"}))
        expect(endState.error).toBe("some error")
    }
)

test("correct status  should be set", () => {
        const endState = applicationReducer(startState, setAppStatus({status: "loading"}))
        expect(endState.status).toBe("loading")
    }
)
