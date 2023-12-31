import * as authSelectors from "./selectors"
import {Login} from "./Login"
import {asyncActions, slice, authReducer, logout} from "./auth-reducer"

const authActions = {
    ...asyncActions,
    ...slice.actions
}

export {
    authSelectors,
    Login,
    logout,
    authReducer,
    authActions
}