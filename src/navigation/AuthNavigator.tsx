import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/auth/screen/Login';
import Register from '../pages/auth/screen/Register';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default AuthNavigator;