import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import PgContext from '../context/PgContext';

import AuthNavigator from './AuthNavigator';
import RootStack from './RootStack';

const RootNavigator = () => {
  const { IsLogin } = useContext(PgContext);

  return (
    <NavigationContainer>
      {IsLogin ? <RootStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;