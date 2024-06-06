import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { FontAwesome5 } from '@expo/vector-icons';

const KAABA_LATITUDE = 21.4224779;
const KAABA_LONGITUDE = 39.8251832;

const Compass = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [magnetometer, setMagnetometer] = useState(null);
  const [angle, setAngle] = useState(new Animated.Value(0));
  const [shown, setShown] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      Magnetometer.setUpdateInterval(1000);
      Magnetometer.addListener((data) => {
        setMagnetometer(data);
      });
    })();

    return () => {
      Magnetometer.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (location && magnetometer) {
      const { latitude, longitude } = location.coords;
      const qiblaDirection = getBearing(latitude, longitude, KAABA_LATITUDE, KAABA_LONGITUDE);
      const heading = Math.atan2(magnetometer.y, magnetometer.x) * (180 / Math.PI);
      const adjustedHeading = heading >= 0 ? heading : 360 + heading;
      const direction = qiblaDirection - adjustedHeading;
      const finalDirection = direction >= 0 ? direction : 360 + direction;

      setShown(finalDirection >= 355 || finalDirection <= 5);
      
      Animated.timing(angle, {
        toValue: finalDirection,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [location, magnetometer]);

  const getBearing = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const toDegrees = (radian) => radian * (180 / Math.PI);

    const dLon = toRadians(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
    const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
              Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
    const bearing = toDegrees(Math.atan2(y, x));
    return (bearing + 360) % 360;
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location && magnetometer) {
    text = 'Finding Qibla direction...';
  }

  return (
    <View style={styles.container}>
      {
       !shown 
       ?<FontAwesome5 name="kaaba" size={50} color={'#6a6a6a'} />
       :<FontAwesome5 name="kaaba" size={50} color={'#444db3'} />
      }

      <Animated.View style={{ transform: [{ rotate: angle.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
          })}] }}>
        <Image source={require('../../../assets/images/compass2.png')} style={{ width: 250, height: 250 }} />
      </Animated.View>
    </View>
  );
};

export default Compass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: '#fff'
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },

})
