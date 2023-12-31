import {setIsLoggedIn} from "../Auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../API/auth-api";

const initializeApp = createAsyncThunk("application/initializeApp", async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}))
    } else {
    }
})

export const asyncActions = {initializeApp}

const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const applicationReducer = slice.reducer
export const {setAppError, setAppStatus} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
    //true когда приложение проинициализировалось (проверка логинизации, проверили юзера, настроййки получили и т.д.)
}
