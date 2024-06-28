import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabRoutes from './TabRoutes';
import {Articles, Components, Pro, Profile} from '@src/screens';
import LoginScreen from '@src/screens/LoginScreen';
import {useStorage} from '@src/context/Storage';
import EditProfileScreen from '@src/screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {isLogin} = useStorage();

  // if (loading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: 'white',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <TouchableOpacity onPress={() => setLoading(false)}>
  //         <ActivityIndicator size="small" color={'#000'} />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'MainApp' : 'LoginScreen'}
      screenOptions={{headerShown: false}}>
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
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainApp"
          component={TabRoutes}
          options={{headerShown: false}}
        />
      </Stack.Group>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Routes;
