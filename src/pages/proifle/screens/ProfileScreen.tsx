// src/screens/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileHeader } from '../components/ProfileHeader';
import { MenuItem } from '../components/MenuItems';
import { useProfile } from '../../../hooks/useProfile';
import { profileMenuItems, logoutItem } from '../data/menuData';
import { pickPhotoFromLibrary } from '../../../utils/photoPicker';

const ProfileScreen = () => {
  const { userData, loading, handleMenuPress, handleLogout, updateProfilePhoto } = useProfile();

  const handleProfilePhotoChange = async () => {
    const selectedPhotoUri = await pickPhotoFromLibrary();
    if (selectedPhotoUri) {
      updateProfilePhoto(selectedPhotoUri);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileHeader
          userName={userData.name}
          userEmail={userData.email}
          photoUri={userData.photoUri}
          onChangePhoto={handleProfilePhotoChange}
        />

    
        <View style={styles.menuContainer}>
          {profileMenuItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              onPress={handleMenuPress}
              isLast={index === profileMenuItems.length - 1}
            />
          ))}
        </View>

        <View style={styles.menuContainer}>
          <MenuItem
            item={logoutItem}
            onPress={handleLogout}
            isLast={true}
          />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 24,
    marginBottom: 8,
  },
});

export default ProfileScreen;
