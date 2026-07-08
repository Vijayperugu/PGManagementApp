// src/components/ProfileHeader.tsx
import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera, User } from 'lucide-react-native';

interface ProfileHeaderProps {
  userName: string;
  userEmail: string;
  photoUri?: string;
  onChangePhoto: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  userEmail,
  photoUri,
  onChangePhoto,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatar} onPress={onChangePhoto}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.avatarImage} />
          ) : (
            <User size={54} color="#fff" />
          )}
          <View style={styles.cameraBadge}>
            <Camera size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'visible',
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});
