import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import Typo from '../../components/Typo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SelectLocationScreen({ navigation, route }) {
  const mapRef = useRef(null);

  const [location, setLocation] = useState(null);

  const [region, setRegion] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    const initLocation = async () => {
      const permission = await requestLocationPermission();

      if (!permission) return;

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };

          setRegion(newRegion);
          setLocation({ latitude, longitude });

          mapRef.current?.animateToRegion(newRegion, 1000);
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    initLocation();
  }, []);

  const handleAdd = () => {
    if (!location) return;

    navigation.navigate('AddStudent', {
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Back Arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Typo variant="h5" color="#fff">
          Select Location
        </Typo>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Close Icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.search}>
        <Icon name="menu" size={22} />
        <TextInput
          placeholder="Try gas stations, ATMs"
          style={{ flex: 1, marginLeft: 10 }}
        />
        <Icon name="mic" size={20} />
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region} // ← was: region={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onPress={e => {
          const coordinate = e.nativeEvent.coordinate;
          setLocation(coordinate); // ← remove setRegion() from here too
        }}
      >
        {location && <Marker coordinate={location} />}
      </MapView>

      {/* My location button */}
      <TouchableOpacity
        style={styles.myLocation}
        onPress={async () => {
          const permission = await requestLocationPermission();

          if (!permission) return;

          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              const newRegion = {
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };

              setLocation({ latitude, longitude });
              mapRef.current?.animateToRegion(newRegion, 1000); // ← this now works
            },
            error => console.log('Location Error:', error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }}
      >
        <Image
          source={require('../../assets/images/Location.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Add button */}
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Typo color="#fff">ADD</Typo>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    height: 70,
    backgroundColor: '#0E5F5C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  map: {
    flex: 1,
  },

  search: {
    position: 'absolute',
    top: 80,
    left: 15,
    right: 15,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5,
    zIndex: 10,
  },

  myLocation: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  addBtn: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#0E5F5C',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
