import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../Application";


export const setAppStatus = createAction<{ status: RequestStatusType }>("common/setAppStatus")
export const setAppError = createAction<{ error: string | null }>("common/setAppError")