import React, {useCallback, useEffect, useState} from 'react';
import {TLoginPayload, TLoginValidation} from './LoginType';
import {useTheme} from '@src/hooks';
import * as regex from '@src/constants/regex';
import {Block, Button, Input, Image, Text} from '@src/components';
import {Platform} from 'react-native';
import ApiAuth from '@src/api/ApiAuthentication';
const isAndroid = Platform.OS === 'android';

const LoginScreen = () => {
  const {assets, colors, gradients, sizes} = useTheme();
  const {SignIn} = ApiAuth();
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
      SignIn(logination.email, logination.password)
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.error('errx', err);
        });
      console.log('handleSignUp', logination);
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
            height={sizes.height * 0.4}>
            <Text h4 center white marginBottom={sizes.md}>
              Welcome to Qontrol
            </Text>
          </Image>
        </Block>
        {/* login form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
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
                  white
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
                  white
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Password'}
                  placeholder={'Enter a password'}
                  onChangeText={value => handleChange({password: value})}
                  success={Boolean(logination.password && isValid.password)}
                  danger={Boolean(logination.password && !isValid.password)}
                />
              </Block>

              <Button
                onPress={handleLogin}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
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
    </Block>
  );
};

export default LoginScreen;
