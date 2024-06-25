import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabRoutes from './TabRoutes';
import {Articles, Components, Pro, Profile} from '@src/screens';
import LoginScreen from '@src/screens/LoginScreen';
import {useStorage} from '@src/context/Storage';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {isLogin, loading} = useStorage();
  console.log(loading, 'loading');

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="small" color={'#000'} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'MainApp' : 'LoginScreen'}
      screenOptions={{headerShown: false}}>
      {isLogin ? (
        <Stack.Group>
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
            name="MainApp"
            component={TabRoutes}
            options={{headerShown: false}}
          />
        </Stack.Group>
      ) : (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
