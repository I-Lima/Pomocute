import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Features/Bootstrap/Screens/SplashScreen";
import HomeScreen from "./Features/Home/Screens/";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash Screen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Splash Screen" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
