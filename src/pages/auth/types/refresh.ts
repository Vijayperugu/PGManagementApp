export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshUser {
  id: number;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: RefreshUser;
}