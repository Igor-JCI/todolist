import {authAPI} from "../API/todolists-api";
import {setIsLoggedInAC} from "../features/Auth/auth-reducer";
import {AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

 const initializeAppTC = createAsyncThunk("app/initializeApp", async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}))
    } else {
    }
})

export const asyncActions = {
    initializeAppTC
}

const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})
export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
    //true когда приложение проинициализировалось (проверка логинизации, проверили юзера, настроййки получили и т.д.)
}
