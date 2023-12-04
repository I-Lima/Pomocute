import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Configure from './Screens/Configure';
import SplashScreen from './Screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Splash Screen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Config' component={Configure} />
      <Stack.Screen name='Splash Screen' component={SplashScreen} />
    </Stack.Navigator>
  );
}

export default Routes;
