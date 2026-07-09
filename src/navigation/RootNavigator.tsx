import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import PgContext from '../context/PgContext';

import AuthNavigator from './AuthNavigator';
import RootStack from './RootStack';
import { is } from 'zod/v4/locales';

const RootNavigator = () => {
  const { IsLogin,isInitializing } = useContext(PgContext);

  if(isInitializing){
    return null
  }

  return (
    <NavigationContainer>
      {IsLogin ? <RootStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;