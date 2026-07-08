import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Branch from '../pages/branch/screens/Branch';
import RoomScreen from '../pages/branch/screens/RoomScreen';

const Stack = createNativeStackNavigator();

const BranchStack = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Branch"
        options={{ headerShown: false }}
        component={Branch}
      />

      <Stack.Screen
        name="Room"
        options={{ headerShown: false }}
        component={RoomScreen}
      />

    </Stack.Navigator>
  );
};

export default BranchStack;
