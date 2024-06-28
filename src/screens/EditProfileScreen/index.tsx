import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '@src/hooks';
import * as regex from '@src/constants/regex';
import {Block, Button, Input, Image, Text} from '@src/components';
import {Platform} from 'react-native';
import {useStorage} from '@src/context/Storage';
import ApiUser from '@src/api/ApiUser';
import useNavigation from '@src/routes/Navigation';
import {TEditProfile, TEditProfileValidation} from './EditProfileType';
import Toast from 'react-native-toast-message';
const isAndroid = Platform.OS === 'android';

const EditProfileScreen = () => {
  const {userId, token} = useStorage();
  const {assets, colors, gradients, sizes} = useTheme();
  const {GETUSERDETAIL, PUTUSER} = ApiUser();
  const {back, navigate} = useNavigation();

  //   const {back} = useNavigation();
  const [isValid, setIsValid] = useState<TEditProfileValidation>({
    email: false,
    username: false,
    phone: false,
    status: false,
  });
  const [profile, setProfile] = useState<TEditProfile>({
    email: '',
    username: '',
    phone: '',
    status: '',
  });
  console.log(profile);

  const handleChange = useCallback((value: Record<string, string>) => {
    setProfile(state => ({...state, ...value}));
  }, []);

  const handleProfile = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      PUTUSER(userId, profile, token)
        .then(res => {
          console.log('hehe', res);
          if (res.code === 200) {
            Toast.show({
              type: 'success',
              text1: 'Profile berhasil di ubah',
            });
            navigate('ProfileScreen');
          } else {
            Toast.show({
              type: 'error',
              text1: 'Sesuatu terjadi, coba lagi nanti',
            });
          }
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Profile gagal di ubah',
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, profile]);

  useEffect(() => {
    GETUSERDETAIL(userId, token).then(async res => {
      if (res.code === 200) {
        setProfile({
          email: res.data.email,
          username: res.data.username,
          phone: res.data.phone,
          status: res.data.status,
        });
      }
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsValid(state => ({
      ...state,
      email: regex.email.test(profile.email),
      username: regex.username.test(profile.username),
      phone: regex.phone.test(profile.phone),
      status: regex.status.test(profile.status),
    }));
  }, [profile, setIsValid]);

  return (
    <Image
      background
      resizeMode="cover"
      padding={sizes.sm}
      source={assets.background}
      height={sizes.height}>
      {/* login form */}
      <Block
        marginTop={sizes.base}
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}>
        <Block
          flex={0}
          radius={sizes.sm}
          marginHorizontal={10}
          showsVerticalScrollIndicator={false}
          shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
        >
          <Block
            flex={0}
            radius={sizes.sm}
            overflow="hidden"
            justify="space-evenly"
            color={colors.white}
            paddingVertical={sizes.sm}>
            <Block
              paddingHorizontal={sizes.sm}
              marginBottom={sizes.md}
              row
              justify="space-between"
              align="center"
              flex={1}>
              <Button row flex={0} justify="flex-start" onPress={back}>
                <Image
                  radius={0}
                  width={10}
                  height={18}
                  color={colors.primary}
                  source={assets.arrow}
                  transform={[{rotate: '180deg'}]}
                />
                <Text p primary marginLeft={sizes.s}>
                  Kembali
                </Text>
              </Button>
              <Text h5 primary>
                Ubah Profile mu
              </Text>
            </Block>
            {/* form inputs */}

            <Block paddingHorizontal={sizes.sm}>
              <Input
                primary
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={'Username'}
                placeholder={'Enter your username'}
                keyboardType="default"
                value={profile.username}
                defaultValue={profile.username}
                success={Boolean(profile.username && isValid.username)}
                danger={Boolean(profile.username && !isValid.username)}
                onChangeText={value => handleChange({username: value})}
              />
              <Input
                primary
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={'Email'}
                keyboardType="email-address"
                value={profile.email}
                defaultValue={profile.email}
                placeholder={'Enter your email address'}
                success={Boolean(profile.email && isValid.email)}
                danger={Boolean(profile.email && !isValid.email)}
                onChangeText={value => handleChange({email: value})}
              />
              <Input
                primary
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={'No Telp'}
                keyboardType="phone-pad"
                value={profile.phone}
                defaultValue={profile.phone}
                placeholder={'Enter your email address'}
                success={Boolean(profile.phone && isValid.phone)}
                danger={Boolean(profile.phone && !isValid.phone)}
                onChangeText={value => handleChange({phone: value})}
              />
              <Input
                primary
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={'Status'}
                value={profile.status}
                disabled={profile.status === 'user'}
                success={Boolean(profile.phone && isValid.phone)}
                danger={Boolean(profile.phone && !isValid.phone)}
                // onChangeText={value => handleChange({email: value})}
              />
            </Block>

            <Button
              onPress={handleProfile}
              marginVertical={sizes.s}
              marginHorizontal={sizes.sm}
              gradient={gradients.primary}
              disabled={Object.values(isValid).includes(false)}>
              <Text bold white transform="uppercase">
                Kirim Update
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Image>
  );
};

export default EditProfileScreen;
