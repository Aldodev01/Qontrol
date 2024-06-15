import ApiAuth from '@src/api/ApiAuthentication';
import {InitializeStorage, useStorage} from '@src/context/Storage';
import React from 'react';
import {View, Text, Pressable} from 'react-native';

const LoginScreen = () => {
  const [isLogin, token] = useStorage();
  const newToken = InitializeStorage.getString('token');

  console.log(isLogin, token, newToken, 'asuasj');

  return (
    <View>
      <Pressable onPress={() => ApiAuth().SignIn()}>
        <Text>{isLogin ? 'logged' : 'unlog'}</Text>
      </Pressable>
      <Pressable onPress={() => ApiAuth().SignOut()}>
        <Text>{isLogin ? 'terlogin' : 'terlogout'}</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
