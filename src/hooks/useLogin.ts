import { useMutation } from "@tanstack/react-query"
import { LoginRequest } from "../pages/auth/types/auth"
import { login } from "../pages/auth/serivice/authService"
import { authStorage } from "../storage/authStorage"
import { Alert } from "react-native"
import { useContext } from "react"
import PgContext from "../context/PgContext"



export const useLogin = () => {
  const { setIsLogin } = useContext(PgContext);

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: async (response) => {
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      if (accessToken && refreshToken) {
        await authStorage.saveTokens(accessToken, refreshToken);
        setIsLogin(true);
      } else {
        Alert.alert('Login Failed', 'Login response did not include access tokens.');
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? error?.message ?? 'Something went wrong';
      Alert.alert('Login Failed', message);
    }
  })
}
