import { api } from "../../../api/axios";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/auth";
import { RefreshResponse, RefreshTokenRequest } from "../types/refresh";


export const login = async( data :LoginRequest): Promise<LoginResponse> =>{
    const  response = await api.post<LoginResponse>(
        "/auth/login",
        data
    )
    return response.data

}


export const register = async (data: RegisterRequest): Promise<RegisterResponse>=>{
    const response = await api.post<RegisterResponse>(
        "/auth/register",
        data
    )
    return response.data

}


export const refresh = async (refreshToken: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        "/auth/refresh",
        { refreshToken }
    )
    return response.data
}


export const refreshToken = async (data: RefreshTokenRequest): Promise<RefreshResponse> => {
  const response = await api.post<RefreshResponse>(
    '/auth/refresh',
    data,
  );
  console.log("Refresh token",response.data)
  return response.data;
};



