import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';
import UserScreen from '../pages/branch/screens/UserScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Tabs"
        component={TabNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserScreen"
        options={{
          title: 'Users',
          headerShown: false,
          
        }}
        component={UserScreen}
       />
    </Stack.Navigator>
  );
};

export default RootStack;
