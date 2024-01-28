import {setIsLoggedIn} from "../Auth/auth-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../API/auth-api";
import {setAppError, setAppStatus} from "../CommonActions/ApplicationsCommonActions";

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
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addCase(setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})

export const applicationReducer = slice.reducer


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
    //true когда приложение проинициализировалось (проверка логинизации, проверили юзера, настроййки получили и т.д.)
}
