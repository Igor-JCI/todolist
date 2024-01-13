import {setAppError, setAppStatus} from "../features/CommonActions/ApplicationsCommonActions";
import {ResponseType} from "../API/types";

type ThunkAPIType = {
    dispatch: (action: any) => any,
    rejectWithValue: Function
}

export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if (showError) {
       return thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : "Some error occurred"}))
    }
    thunkAPI.dispatch(setAppStatus({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsError: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: any, thunkAPI: ThunkAPIType,
                                              showError = true) => {
    if (showError) {
        return thunkAPI.dispatch(setAppError({error: error.message ? error.message : "Some error occurred"}))
    }
    thunkAPI.dispatch(setAppStatus({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsError: undefined})
}


