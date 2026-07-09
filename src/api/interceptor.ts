import {AxiosError,InternalAxiosRequestConfig} from 'axios';
import { api } from './axios';
import { authStorage } from '../storage/authStorage';
import { refreshToken } from '../pages/auth/serivice/authService';


interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;

let failedQueue: FailedRequest[] = [];
let interceptorsReady = false;


const processQueue = (error: unknown,token: string | null = null) => {
    failedQueue.forEach(request => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token!);
    }
  });
  failedQueue = [];
};
export const setupInterceptors = () => {
  if (interceptorsReady) {
    return;
  }

  interceptorsReady = true;

  api.interceptors.request.use(
    async config => {
      const token =await authStorage.getAccessToken();
      const isAuthRequest =
        config.url?.includes('/auth/login') ||
        config.url?.includes('/auth/register') ||
        config.url?.includes('/auth/refresh');
      if (token && !isAuthRequest) {
        config.headers = config.headers ?? {};
        config.headers.Authorization =
          `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );
  api.interceptors.response.use(response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryAxiosRequestConfig;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      const isAuthRequest =
        originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/auth/register') ||
        originalRequest.url?.includes('/auth/refresh');

      if (error.response?.status !== 401 || originalRequest._retry || isAuthRequest) {
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
            });
          },
        ).then(token => {
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization =`Bearer ${token}`;
          return api(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refresh = await authStorage.getRefreshToken();
        if (!refresh) {
          throw new Error(
            'Refresh token not found',
          );
        }

        const response = await refreshToken({refreshToken: refresh});
        const {id,name,email,role,accessToken,refreshToken:newRefreshToken} = response.data;
        await authStorage.saveTokens(
          accessToken,
          newRefreshToken,
        );
        await authStorage.updateUser({id,name,email,role});
        api.defaults.headers.common.Authorization =`Bearer ${accessToken}`;
        processQueue(null, accessToken,);
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization =`Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        await authStorage.clearAuth();

        /**
         * TODO
         *
         * Navigate Login
         */

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    },
  );
};
