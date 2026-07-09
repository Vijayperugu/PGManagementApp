import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StoredUser {
  id: number;
  name: string;
  email: string;
  role: string;
  photoUri?: string;
}

const STORAGE_KEYS = {
  ACCESS_TOKEN: '@pg_access_token',
  REFRESH_TOKEN: '@pg_refresh_token',
  USER: '@pg_user',
};

export const authStorage = {
  saveTokens(accessToken: string, refreshToken: string): Promise<[void, void]> {
    return Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
      AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
    ]);
  },

  saveAccessToken(token: string): Promise<void> {
    return AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  saveRefreshToken(token: string): Promise<void> {
    return AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  saveUser(user: StoredUser): Promise<void> {
    return AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  async updateUser(user: Partial<StoredUser>): Promise<StoredUser> {
    const currentUser = await this.getUser();
    const nextUser = {
      ...currentUser,
      ...user,
    } as StoredUser;

    await this.saveUser(nextUser);
    return nextUser;
  },

  getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  getUser(): Promise<StoredUser | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.USER).then((user) => {
      if (!user) {
        return null;
      }
      return JSON.parse(user);
    });
  },

  clearTokens(): Promise<[void, void]> {
    return Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
    ]);
  },

  clearAuth(): Promise<[void, void, void]> {
    return Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER),
    ]);
  },

  isLoggedIn(): Promise<boolean> {
    return AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN).then((token) => {
      return !!token;
    });
  },
};
