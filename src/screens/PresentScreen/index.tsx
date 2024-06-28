import {Block, Image, Text} from '@src/components';
import {useTheme} from '@src/hooks';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import useNavigation from '@src/routes/Navigation';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiYWxkb2RldnYiLCJhIjoiY2x4dWRyd2t4MGYyazJrc2EwNm90amJnZyJ9.IJDelc9a-OWfwMHNrKBITg',
);

const RADIUS = 100; // Radius in meters
const CENTER_COORDINATE: number[] = [106.81363389803451, -6.2168881]; // Center coordinates
const cunterCoordinate: [number, number] = [106.81363389803451, -6.2168881]; // Center coordinates

const PresentScreen = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const {navigate} = useNavigation();

  useEffect(() => {
    const checkLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        getLocation();
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (!granted) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            navigate('HomeScreen');
          }
        } else {
          getLocation();
        }
      }
    };

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation([longitude, latitude]);
        },
        error => {
          console.error(error);
          navigate('HomeScreen');
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    checkLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userLocation, "hehe");
  

  const defaultCoordinates: [number, number] = [0, 0];

  return (
    <MapboxGL.MapView style={styles.map}>
      {/* <MapboxGL.Camera centerCoordinate={cunterCoordinate} zoomLevel={5} /> */}
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
              radius: 10000,
              units: 'meters',
            },
          },
        }}>
        <MapboxGL.Camera
          centerCoordinate={userLocation || defaultCoordinates}
          zoomLevel={userLocation ? 5 : 0} // Adjust zoom level based on availability of userLocation
        />
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
    </MapboxGL.MapView>
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
