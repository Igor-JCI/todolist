import axios from "axios/index";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8c42f357-e574-4a47-b1b5-8938589ef98b"
    }
}
export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})