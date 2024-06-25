import {Block, Image, Text} from '@src/components';
import {useTheme} from '@src/hooks';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiYWxkb2RldnYiLCJhIjoiY2x4dWRyd2t4MGYyazJrc2EwNm90amJnZyJ9.IJDelc9a-OWfwMHNrKBITg',
);

const RADIUS = 1000; // Radius in meters
const CENTER_COORDINATE: [number, number] = [
  -6.2173474552351715, 106.81392048485577,
]; // Center coordinates

const PresentScreen = () => {
  const {assets, colors, gradients, sizes} = useTheme();

  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [isInsideRadius, setIsInsideRadius] = useState<boolean | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getUserLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        getUserLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        setUserLocation([longitude, latitude]);
        checkIfInsideRadius([longitude, latitude]);
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const checkIfInsideRadius = (location: [number, number]) => {
    const distance = getDistance(CENTER_COORDINATE, location);
    setIsInsideRadius(distance <= RADIUS);
  };

  const getDistance = (coord1: [number, number], coord2: [number, number]) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };
  return (
    <Image
      background
      source={assets.background}
      padding={sizes.padding}
      style={{flex: 1}}>
      <Block safe justify="center">
        <Block card flex={0} padding={sizes.sm} marginBottom={sizes.sm}>
          <Text h4 center semibold marginBottom={sizes.sm}>
            Title
          </Text>
        </Block>
      </Block>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            centerCoordinate={CENTER_COORDINATE}
            zoomLevel={14}
          />

          <MapboxGL.ShapeSource
            id="circleSource"
            shape={{
              type: 'FeatureCollection',
              features: [
                {
                  properties: {},
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: CENTER_COORDINATE,
                  },
                },
              ],
            }}>
            <MapboxGL.CircleLayer
              id="circleLayer"
              style={{
                circleRadius: RADIUS,
                circleColor: 'rgba(0, 0, 255, 0.3)',
              }}
            />
          </MapboxGL.ShapeSource>

          {userLocation && (
            <MapboxGL.PointAnnotation id="" coordinate={userLocation}>
              <View style={styles.annotationContainer}>
                <View style={styles.annotationFill} />
              </View>
            </MapboxGL.PointAnnotation>
          )}
        </MapboxGL.MapView>

        {isInsideRadius === false && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>You are outside the radius!</Text>
          </View>
        )}
      </View>
    </Image>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
  },
  annotationFill: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
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
