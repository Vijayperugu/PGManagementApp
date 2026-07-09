import { authStorage } from "../storage/authStorage"
import { api } from "./axios"


export const setRequestInterceptor = () => {
    api.interceptors.request.use(
        async config => {
            const token = await authStorage.getAccessToken()
            const isAuthEndpoint =
                config.url?.includes('/auth/login') ||
                config.url?.includes('/auth/register') ||
                config.url?.includes('/auth/refresh');
            if (token && !isAuthEndpoint) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config
        },
        error => Promise.reject(error)

    )
}
