import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['top', 'bottom']}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ScreenWrapper;
