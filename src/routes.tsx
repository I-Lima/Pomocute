import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Configure from './Screens/Configure';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Features/Home';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Splash Screen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Config' component={Configure} />
      <Stack.Screen name='Splash Screen' component={SplashScreen} />
    </Stack.Navigator>
  );
}

export default Routes;
