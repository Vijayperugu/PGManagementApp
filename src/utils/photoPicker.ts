import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export const pickPhotoFromLibrary = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 0.8,
  });

  if (result.didCancel) {
    return undefined;
  }

  if (result.errorMessage) {
    Alert.alert('Photo error', result.errorMessage);
    return undefined;
  }

  return result.assets?.[0]?.uri;
};
