import {FieldErrorType, LoginParamsType} from "../../API/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../API/auth-api";
import { setAppStatus } from "../Application";

//thunks
export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsError?: Array<FieldErrorType> } }>("auth/login", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const logout = createAsyncThunk("auth/logout", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {login, logout}

export const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true
            }
        );
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })

    }
})

export const {setIsLoggedIn} = slice.actions
export const authReducer = slice.reducer


