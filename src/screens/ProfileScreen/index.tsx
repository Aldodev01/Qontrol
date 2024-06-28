import ApiAuth from '@src/api/ApiAuthentication';
import ApiUser from '@src/api/ApiUser';
import {Block, Button, Image, Text} from '@src/components';
import {InitializeStorage, useStorage} from '@src/context/Storage';
import {useTheme} from '@src/hooks';
import useNavigation from '@src/routes/Navigation';
import {TUser} from '@src/types/TUser';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import FontIcon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  const {GETUSERDETAIL, PUTUSERPROFILE} = ApiUser();
  const {SignOut} = ApiAuth();
  const {replace, navigate} = useNavigation();
  const {setIsLogin, setToken, setUserId, setLoading, token} = useStorage();
  const [user, setUser] = useState<TUser>();
  const {assets, colors, sizes, icons, gradients} = useTheme();
  const userId = InitializeStorage.getString('userId');
  // const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  // const IMAGE_VERTICAL_SIZE =
  //   (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  // const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  // const IMAGE_VERTICAL_MARGIN =
  //   (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        PUTUSERPROFILE(userId, selectedImage, token).then(async res => {
          if (res.code === 200) {
            Toast.show({
              type: 'success',
              text1: 'Foto Profil Berhasil',
            });
            GetingUserData();
          }
        });
      }
    });
  };

  const Logout = () => {
    SignOut(userId)
      .then(async res => {
        if ((await res.code) === 200) {
          Toast.show({
            type: 'success',
            text1: 'Sampai jumpa kembali ya',
          });
          setIsLogin(false);
          setToken(res.token);
          setUserId(res.user.id);
          setLoading(false);
          replace('LoginScreen');
        } else {
          setLoading(false);
          setIsLogin(false);
          replace('LoginScreen');
          Toast.show({
            type: 'error',
            text1: 'Gagal Keluar, Silahkan Coba Lagi nanti',
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
          text1: 'Gagal Keluar, Silahkan Coba Lagi nanti',
        });
      });
  };

  const GetingUserData = () => {
    GETUSERDETAIL(userId, token).then(res => {
      setUser(res?.data);
    });
  };
  useEffect(() => {
    GetingUserData();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <Image
        background
        resizeMode="cover"
        height={sizes.height * 0.2}
        borderBottomLeftRadius={sizes.borderBottomLeftRadius}
        borderBottomRightRadius={sizes.borderBottomRightRadius}
        source={assets.background}>
        <Text h4 center white marginTop={sizes.md}>
          Qontrol
        </Text>
        <Text p size={10} center white>
          Absensi Praktis, mudahkan mengatur kinerjamu
        </Text>
      </Image>
      <View style={styles.imageWraper}>
        <View style={styles.imageContent}>
          <Image
            width={100}
            height={100}
            radius={99999}
            source={{uri: user?.profile_pic}}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              backgroundColor: 'white',
              borderRadius: 99999,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleChoosePhoto}>
            <FontIcon size={20} name="edit" color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View>
          <Text h5 center black>
            {user?.username}
          </Text>
          <Text p center black>
            {user?.employee_no}
          </Text>
        </View>
      </View>

      <Block marginTop={-10} paddingHorizontal={sizes.sm} flex={1}>
        <Button
          activeOpacity={0.3}
          onPress={() => navigate('EditProfileScreen')}
          marginTop={sizes.xs}
          flex={1}
          row
          align="center"
          justify="space-between">
          <Text p>Ganti Profile</Text>
          <Image
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
          />
        </Button>
        <View style={{height: 100}} />
        <View style={{height: 100}} />

        {/* profile: stats */}
        {/* <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>{user?.stats?.posts}</Text>
                <Text>Post</Text>
              </Block>
              <Block align="center">
                <Text h5>{(user?.stats?.followers || 0) / 1000}k</Text>
                <Text>Follower</Text>
              </Block>
              <Block align="center">
                <Text h5>{(user?.stats?.following || 0) / 1000}k</Text>
                <Text>Following</Text>
              </Block>
            </Block>
          </Block> */}
        {/*
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              About Me
            </Text>
            <Text p lineHeight={26}>
              {user?.email}
            </Text>
          </Block>

          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                Album
              </Text>
              <Button>
                <Text p primary semibold>
                  View All
                </Text>
              </Button>
            </Block>
            <Block row justify="space-between" wrap="wrap">
              <Image
                resizeMode="cover"
                source={assets?.photo1}
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              />
              <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={assets?.photo2}
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={assets?.photo3}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
              </Block>
            </Block>
          </Block>*/}
      </Block>
      <Block paddingHorizontal={sizes.sm}>
        <Button
          row
          gradient={gradients.primary}
          onPress={Logout}
          marginBottom={sizes.base}>
          <Text marginRight={sizes.xs} white bold transform="uppercase">
            Keluar
          </Text>
          <Icon size={18} name="log-out-outline" color={colors.white} />
        </Button>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContent: {
    zIndex: 2,
    borderRadius: 99999,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageWraper: {
    flex: 1,
    marginTop: -60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
