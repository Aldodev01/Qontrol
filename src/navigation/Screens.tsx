import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Pro} from '@src/screens';
import {useScreenOptions} from '@src/hooks';
import { useStorage } from '@src/context/Storage';

const Stack = createStackNavigator();

export default () => {
  const screenOptions = useScreenOptions();
  const {isLogin} = useStorage()

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      {isLogin ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} options={{title: 'Soft UI'}} />

        </Stack.Group>
      ) : ( <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />)}

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: 'Soft UI'}}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

     
    </Stack.Navigator>
  );
};
