import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const authStorage = {
  async saveTokens(accessToken: string, refreshToken: string) {
    await Promise.all([
      AsyncStorage.setItem(ACCESS_TOKEN, accessToken),
      AsyncStorage.setItem(REFRESH_TOKEN, refreshToken),
    ]);
  },

  async getAccessToken() {
    return await AsyncStorage.getItem(ACCESS_TOKEN);
  },

  async getRefreshToken() {
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  },

  async clear() {
    // Replaces multiRemove
    await Promise.all([
      AsyncStorage.removeItem(ACCESS_TOKEN),
      AsyncStorage.removeItem(REFRESH_TOKEN),
    ]);
  },
};
