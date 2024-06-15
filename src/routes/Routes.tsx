import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@src/screen/HomeScreen';
import LoginScreen from '@src/screen/LoginScreen';
import OnBoardScreen from '@src/screen/OnBoardScreen';
import React from 'react';
import TabRoutes from './TabRoutes';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoard" component={OnBoardScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={TabRoutes} />
    </Stack.Navigator>
  );
};

export default Routes;
