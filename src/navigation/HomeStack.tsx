import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeScreen from '../pages/home/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={HomeScreen}
      />       
    </Stack.Navigator>
  );
};

export default HomeStack;