import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import BranchStack from './BranchStack';

import { Home, Building, User } from 'lucide-react-native';
import ProfileScreen from '../pages/proifle/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const renderHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Home color={color} size={size} />
);
const renderBranchIcon = ({ color, size }: { color: string; size: number }) => (
  <Building color={color} size={size} />
);
const renderProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <User color={color} size={size} />
);

const TabNavigation = () => {
  return (
    <Tab.Navigator>

      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: renderHomeIcon,
        }}
      />

      <Tab.Screen
        name="Branches"
        component={BranchStack}
        options={{
          headerShown: false,
          tabBarIcon: renderBranchIcon,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: renderProfileIcon,
        }}
      />

    </Tab.Navigator>
  );
};

export default TabNavigation;
