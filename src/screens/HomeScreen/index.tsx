import ApiPresent from '@src/api/ApiPresent';
import ApiUser from '@src/api/ApiUser';
import {Block, Image, Text} from '@src/components';
import {InitializeStorage, useStorage} from '@src/context/Storage';
import {useTheme} from '@src/hooks';
import useNavigation from '@src/routes/Navigation';
import {TSummaries, TUser} from '@src/types/TUser';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  const {assets, colors, sizes} = useTheme();
  const [user, setUser] = useState<TUser>();
  const {GETUSERDETAIL} = ApiUser();
  const {GETSUMMARIESPRESENT} = ApiPresent();
  const {replace} = useNavigation();
  const {setIsLogin, setToken, setUserId} = useStorage();
  const [summaries, setSummaries] = useState<TSummaries | undefined>();
  const userId = InitializeStorage.getString('userId');
  const token = InitializeStorage.getString('token');

  const GetingUserData = async () => {
    await GETUSERDETAIL(userId, token)
      .then(res => {
        if (res?.code === 200) {
          setUser(res?.data);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Gagal Mendapatkan data, Silahkan Coba Lagi nanti',
          });
          setTimeout(() => {
            setIsLogin(false);
            setToken('');
            setUserId('');
            replace('LoginScreen');
          }, 2000);
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Gagal Mendapatkan data, Silahkan Coba Lagi nanti',
        });
        console.error(err);
        setIsLogin(false);
        setToken('');
        setUserId('');
        replace('LoginScreen');
      });
  };

  const GetingSumariesPresent = async () => {
    await GETSUMMARIESPRESENT(userId, token).then(res => {
      if (res?.code === 200) {
        setSummaries(res.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Gagal Mendapatkan data, Silahkan Coba Lagi nanti',
        });
        setSummaries(undefined);
        setTimeout(() => {
          setIsLogin(false);
          setToken('');
          setUserId('');
          replace('LoginScreen');
        }, 2000);
      }
    });
  };
  useEffect(() => {
    GetingUserData();
    GetingSumariesPresent();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pieData = [
    {
      value: summaries?.lateTrueCount ?? 0,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
    },
    {
      value: summaries?.lateFalseCount ?? 0,
      color: '#FFA5BA',
      gradientCenterColor: '#FF7F97',
    },
  ];
  const renderLegend = (color: string, type: string, persentase: number) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: 120,
          marginRight: 20,
        }}>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: color,
            marginRight: 10,
          }}
        />
        <Text p white size={10}>
          {type}: {persentase}%
        </Text>
      </View>
    );
  };

  return (
    <Image
      background
      resizeMode="cover"
      height={sizes.height}
      borderBottomLeftRadius={sizes.borderBottomLeftRadius}
      borderBottomRightRadius={sizes.borderBottomRightRadius}
      source={assets.background}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Image
            width={50}
            height={50}
            radius={99999}
            source={
              user?.profile_pic
                ? {uri: user?.profile_pic}
                : require('@src/assets/images/card5.png')
            }
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text h5 white>
              {user?.username}
            </Text>
            <Text p white>
              {user?.employee_no}
            </Text>
          </View>
        </View>
        <Image
          width={30}
          height={30}
          source={require('@src/assets/images/logo.png')}
        />
      </View>
      <View style={{height: 30}} />

      {summaries ? (
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          white
          radius={sizes.sm}
          flex={1}>
          <Block
            margin={20}
            padding={sizes.sm}
            radius={sizes.sm}
            overflow="hidden"
            justify="space-evenly"
            color={colors.primary}
            tint={'xlight'}
            paddingVertical={sizes.sm}>
            <Text bold white h4>
              Your Performance :
            </Text>
            <View
              style={{
                padding: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={60}
                innerRadius={40}
                innerCircleColor={'#232B5D'}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text white bold p size={15}>
                        {summaries?.totalAbsences}
                      </Text>
                      <Text white p size={10}>
                        Total
                      </Text>
                    </View>
                  );
                }}
              />
              <Block marginLeft={10}>
                {renderLegend(
                  '#FF7F97',
                  'Terlambat',
                  summaries?.lateTrueCount ?? 0,
                )}
                {renderLegend(
                  '#3BE9DE',
                  'Tepat Waktu',
                  summaries?.lateFalseCount ?? 0,
                )}
              </Block>
            </View>
          </Block>
        </Block>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </Image>
  );
};

export default HomeScreen;
