import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabRoutes from './TabRoutes';
import {Articles, Components, Home, Pro, Profile, Register} from '@src/screens';
import LoginScreen from '@src/screens/LoginScreen';
import { InitializeStorage } from '@src/context/Storage';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const login = InitializeStorage.getString('login');
  console.log(login, 'hehe');
  
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />

      <Stack.Screen name="Components" component={Components} />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: 'Articles'}}
      />

      <Stack.Screen name="Pro" component={Pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="MainApp" component={TabRoutes} />
    </Stack.Navigator>
  );
};

export default Routes;
