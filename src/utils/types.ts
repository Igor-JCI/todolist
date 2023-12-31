import {FieldErrorType} from "../API/types";
import {rootReducer,store} from "../app/store";

export type RootReducerType = typeof rootReducer
export type AppRootState = ReturnType<RootReducerType>

export type AppDispatchType = typeof store.dispatch


export type ThunkError = { rejectValue: { errors: Array<string>, fieldsError?: Array<FieldErrorType> } }