import React, {useCallback, useEffect, useState} from 'react';
import {TLoginPayload, TLoginValidation} from './LoginType';
import {useTheme} from '@src/hooks';
import * as regex from '@src/constants/regex';
import {Block, Button, Input, Image, Text} from '@src/components';
import {Platform} from 'react-native';
import ApiAuth from '@src/api/ApiAuthentication';
import {useStorage} from '@src/context/Storage';
import Toast from 'react-native-toast-message';
import ApiUser from '@src/api/ApiUser';
import useNavigation from '@src/routes/Navigation';
const isAndroid = Platform.OS === 'android';

const LoginScreen = () => {
  const {setIsLogin, setToken, setUserId, setLoading, token, loading} = useStorage();

  const {assets, colors, gradients, sizes} = useTheme();
  const {replace} = useNavigation();
  const {SignIn} = ApiAuth();
  const {GETUSERDETAIL} = ApiUser();

  //   const {back} = useNavigation();
  const [isValid, setIsValid] = useState<TLoginValidation>({
    email: false,
    password: false,
  });
  const [logination, setLogination] = useState<TLoginPayload>({
    email: '',
    password: '',
  });

  const handleChange = useCallback(
    (value: Record<string, string | boolean>) => {
      setLogination(state => ({...state, ...value}));
    },
    [setLogination],
  );

  const handleLogin = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      setLoading(true);
      SignIn(logination.email, logination.password)
        .then(async res => {
          if (res.code === 200) {
            setToken(res.token);
            setUserId(res.user.id);
            GETUSERDETAIL(res?.user?.id, res.token).then(ros => {
              if (ros.code === 200) {
                Toast.show({
                  type: 'success',
                  text1: 'Selamat datang di Qontrol',
                });
                setIsLogin(true);
                setLoading(false);
                replace('MainApp');
              } else {
                setLoading(false);
                setIsLogin(false);
                replace('LoginScreen');
                Toast.show({
                  type: 'error',
                  text1: 'Gagal Masuk, Silahkan Coba Lagi',
                });
              }
            });
          } else if (res.code === 404) {
            setLoading(false);
            setIsLogin(false);
            setToken('');
            setUserId('');
            Toast.show({
              type: 'info',
              text1: 'Email atau password salah',
            });
          }
        })
        .catch(() => {
          setLoading(false);
          setToken('');
          setUserId('');
          setIsLogin(false);
          Toast.show({
            type: 'error',
            text1: 'Gagal Masuk, Silahkan Coba Lagi',
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, logination]);

  useEffect(() => {
    setIsValid(state => ({
      ...state,
      email: regex.email.test(logination.email),
      password: regex.password.test(logination.password),
    }));
  }, [logination, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>
            <Text h4 center white marginBottom={sizes.md}>
              Welcome to Qontrol
            </Text>
            <Block center row flex={1}>
              <Image
                resizeMode="contain"
                padding={sizes.sm}
                source={assets.logo}
                width={70}
                height={70}
              />
            </Block>
          </Image>
        </Block>
        {/* login form */}
        <Block
          keyboard
          height={120}
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={10}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="5%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  primary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Email'}
                  keyboardType="email-address"
                  placeholder={'Enter your email address'}
                  success={Boolean(logination.email && isValid.email)}
                  danger={Boolean(logination.email && !isValid.email)}
                  onChangeText={value => handleChange({email: value})}
                />
                <Input
                  primary
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Password'}
                  placeholder={'Enter a password'}
                  onChangeText={value => handleChange({password: value})}
                  success={Boolean(logination.password && isValid.password)}
                  danger={Boolean(logination.password && !isValid.password)}
                />
              <Button
                onPress={handleLogin}
                marginVertical={sizes.s}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
                  Sign In
                </Text>
              </Button>
              </Block>

            </Block>
          </Block>
        </Block>
        <Text p size={10} center black marginTop={sizes.md}>
          © 2024 Qontrol. All rights reserved
        </Text>
      </Block>
    </Block>
  );
};

export default LoginScreen;
