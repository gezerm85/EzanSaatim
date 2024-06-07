import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome5, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const [mosques, setMosques] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Konum izni reddedildi');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location) {
        const apiKey = 'AIzaSyAlwnOW9zIvMxkz7GEgPFGxSp7dBSsuyBI';
        const radius = 1000; 
        
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}&type=mosque&key=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            setMosques(data.results);
          })
          .catch(error => console.error('Cami verileri alınamadı:', error));
      }
    })();
  }, []);

  const centerMap = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Konum alınıyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {mosques.map((mosque, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: mosque.geometry.location.lat,
              longitude: mosque.geometry.location.lng,
            }}
            title={mosque.name}
            description={mosque.vicinity}
          >
            <FontAwesome5 name="mosque" size={24} color="#444db3" />
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Mevcut Konum"
          description="Buradasınız"
        >
          <FontAwesome6 name="user-large" size={24} color="#444db3" />
        </Marker>
      </MapView>
      <View style={styles.buttonContainer}>
        <MaterialIcons onPress={centerMap} name="my-location" size={35} color="#fff" />
      </View>
    </View> 
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    borderRadius: 50,
    padding: 5,
    bottom: 80,
    right: 10,
    backgroundColor: '#444db3',
    transform: [{ translateX: -10 }],
  },
});
