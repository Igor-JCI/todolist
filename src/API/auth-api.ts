import {LoginParamsType, ResponseType} from "./types";
import {instance} from "./instance";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>("auth/login", data)
    },
    logout() {
        return instance.delete<ResponseType>("auth/me")
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>("auth/me")
    }
}