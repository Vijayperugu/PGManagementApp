// src/hooks/useProfile.ts
import { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import PgContext from '../context/PgContext';
import { MenuItem } from '../pages/proifle/data/menuData';
import { authStorage } from '../storage/authStorage';

export const getProfileUserData = (data?: Record<string, any> | null) => {
  const normalizedData = data ?? {};

  return {
    name: normalizedData.userName || normalizedData.name || 'Guest User',
    email: normalizedData.email || 'guest@example.com',
    photoUri: normalizedData.photoUri || '',
  };
};

export const useProfile = () => {
  const navigation = useNavigation();
  const { setIsLogin } = useContext(PgContext);
  const [userData, setUserData] = useState(getProfileUserData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = await authStorage.getUser();
      setUserData(getProfileUserData(storedUser));
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      navigation.navigate(item.route as never);
    } else if (item.onPress) {
      item.onPress();
    }
  };

  const updateProfilePhoto = async (photoUri: string) => {
    try {
      const nextUserData = await authStorage.updateUser({ photoUri });
      setUserData(getProfileUserData(nextUserData));
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile photo.');
      console.error('Profile photo error:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await authStorage.clearAuth();
              await AsyncStorage.removeItem('rememberedUser');
              await AsyncStorage.removeItem('userData');
              setIsLogin(false);
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return {
    userData,
    loading,
    handleMenuPress,
    handleLogout,
    updateProfilePhoto,
  };
};
