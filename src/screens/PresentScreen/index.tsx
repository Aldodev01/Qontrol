import {Button, Text} from '@src/components';
import {useTheme} from '@src/hooks';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
// import useNavigation from '@src/routes/Navigation';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import ApiPresent from '@src/api/ApiPresent';
import {TAbsence, TDistance} from './PresentType';
import Toast from 'react-native-toast-message';
import {InitializeStorage, useStorage} from '@src/context/Storage';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiYWxkb2RldnYiLCJhIjoiY2x4dWRyd2t4MGYyazJrc2EwNm90amJnZyJ9.IJDelc9a-OWfwMHNrKBITg',
);

const CENTER_COORDINATE: number[] = [106.81363389803451, -6.2168881]; // Center coordinates
const cunterCoordinate: [number, number] = [106.81363389803451, -6.2168881]; // Center coordinates
const PresentScreen = () => {
  // const {navigate} = useNavigation();
  const {colors, sizes, gradients} = useTheme();
  const [myCoords, setMyCoords] = useState(cunterCoordinate);
  const [distance, setDistance] = useState<TDistance | undefined>(undefined);
  const {absencer, setAbsencer} = useStorage();
  const time = new Date().toISOString();
  const requestTime = new Date(time);
  const hours = requestTime.getHours();
  const minutes = requestTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const {GETDISTANCE, GETPRESENTID, CheckIn} = ApiPresent();
  const userId = InitializeStorage.getString('userId');
  const token = InitializeStorage.getString('token');

  const handleCheckin = async () => {
    if (
      (distance?.routes[0]?.distance ?? 0 < 1000) &&
      distance?.routes[0]?.distance !== 0
    ) {
      if (totalMinutes >= 450 && totalMinutes <= 750) {
        if (!absencer) {
          await CheckIn(userId, myCoords[0], myCoords[1], token).then(res => {
            if (res.code === 200) {
              Toast.show({
                type: 'success',
                text1: 'Absen Berhasil',
              });
              setAbsencer(true);
            }
          });
          setAbsencer(true);
        } else {
          Toast.show({
            type: 'info',
            text1: 'Tidak bisa absen in karena sudah absen',
          });
        }
      } else {
        Toast.show({
          type: 'info',
          text1: 'Tidak bisa absen in karena sudah lewat waktunya',
        });
      }
    } else {
      Toast.show({
        type: 'info',
        text1: 'Tidak bisa absen diluar jangkauan',
      });
    }
  };

  function getButtonMessage(distancex: number | undefined): string {
    if (distancex !== undefined && distancex >= 1000) {
      return 'Diluar jangkauan';
    } else if (totalMinutes >= 390 && totalMinutes <= 750) {
      // 07:30 - 12:30 (450 - 750 menit)
      return 'Abesensi sekarang';
    } else if (totalMinutes >= 751 && totalMinutes <= 990) {
      // 12:31 - 16:30 (751 - 990 menit)
      return 'Absensi Setengah hari';
    } else if (
      (totalMinutes >= 991 && totalMinutes <= 1440) ||
      (totalMinutes >= 0 && totalMinutes < 360)
    ) {
      // 16:31 - 06:00 (991 - 1440 menit atau 0 - 360 menit)
      return 'Diluar jam kerja';
    } else {
      return 'Waktu tidak valid';
    }
  }
  function getAbsenceMessage(distance: number | undefined): string {
    if (distance !== undefined && distance >= 1000) {
      return 'Anda sedang berada diluar jangkauan';
    } else {
      if(absencer){
        return 'Anda sudah absen in, mohon tunggu jam absen out';
      } else {
        return 'Silahkan absen in sekarang';
      }
    }
   
    if (distance !== undefined && distance >= 1000) {
      return 'Anda sedang berada diluar jangkauan';
    } else if (totalMinutes >= 450 && totalMinutes <= 750) {
      // 07:30 - 12:30 (450 - 750 menit)
      return 'Silahkan Abesensi sekarang';
    } else if (totalMinutes >= 751 && totalMinutes <= 990) {
      // 12:31 - 16:30 (751 - 990 menit)
      return 'Waktu kerja Anda hari ini setengah hari';
    } else if (
      (totalMinutes >= 991 && totalMinutes <= 1440) ||
      (totalMinutes >= 0 && totalMinutes < 360)
    ) {
      // 16:31 - 06:00 (991 - 1440 menit atau 0 - 360 menit)
      return 'Absen tidak bisa karena sekarang diluar jam kerja';
    } else {
      return 'Waktu tidak valid';
    }
  }

  // function shouldDisableButton(
  //   distancer: number | undefined,
  //   absences: string,
  // ): boolean {
  //   if (distancer === undefined || distancer >= 1000) {
  //     return true; // Disable jika diluar jangkauan
  //   }
  //   if (totalMinutes < 450 || (totalMinutes > 750 && totalMinutes < 991)) {
  //     return true; // Disable jika diluar jam kerja
  //   }
  //   if (absences === 'checked in') {
  //     return true; // Disable jika sudah absen
  //   }
  //   return false; // Enable jika semua kondisi terpenuhi
  // }

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        GETDISTANCE(cunterCoordinate, [longitude, latitude]).then(
          (response: TDistance) => {
            setDistance(response);
          },
        );
        setMyCoords([longitude, latitude]);
      },
      error => {
        console.log('Error getting position:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.map, {position: 'relative'}]}>
      <MapboxGL.MapView
        style={styles.map}
        rotateEnabled
        pitchEnabled
        projection="globe">
        <MapboxGL.Camera centerCoordinate={myCoords} zoomLevel={17} />
        <MapboxGL.ShapeSource
          id="circleSource"
          shape={{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: CENTER_COORDINATE,
            },
            properties: {
              name: 'My Circle',
              description: 'This is a circle with a 1000m radius.',
              id: 1,
              createdAt: new Date().toISOString(),
              additionalInfo: {
                type: 'circle',
                radius: 100000000,
                units: 'meters',
              },
            },
          }}>
          <MapboxGL.CircleLayer
            id="circleLayer"
            style={{
              circleRadius: 100,
              circleColor: 'rgba(55, 148, 179, 0.5)',
              circleStrokeWidth: 1,
              circleStrokeColor: 'rgba(55, 148, 179, 1)',
            }}
          />
        </MapboxGL.ShapeSource>
        <MapboxGL.MarkerView coordinate={myCoords}>
          <FontIcon
            map-marker
            name="map-marker"
            size={20}
            color={colors.primary}
          />
        </MapboxGL.MarkerView>
      </MapboxGL.MapView>
      {true && (
        <View style={styles.annotationContainer}>
          <View
            style={{
              padding: sizes.padding,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 20,
            }}>
            {absencer ? (
              <Button
                gradient={gradients.black}
                onPress={() => {}}
                paddingHorizontal={sizes.xs}>
                <Text white p bold size={12}>
                  Sudah Absen
                </Text>
              </Button>
            ) : (
              <Button
                gradient={gradients.primary}
                onPress={handleCheckin}
                paddingHorizontal={sizes.xs}>
                <Text white p bold size={12}>
                  {getButtonMessage(distance?.routes[0]?.distance ?? 0)}
                </Text>
              </Button>
            )}

            <Text style={{flex: 1}} p black size={12} marginLeft={sizes.sm}>
              {getAbsenceMessage(distance?.routes[0]?.distance ?? 0)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: 1,
  },
  annotationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  annotationFill: {
    backgroundColor: 'white',
    borderRadius: 15,
    flex: 1,
  },
  alertContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  alertText: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default PresentScreen;
