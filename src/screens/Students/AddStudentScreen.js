import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import Typo from '../../components/Typo';
import Button from '../../components/Button';
import COLORS from '../../utils/colors';

import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import db from '../../database/database';

export default function AddStudentScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState(null);
  const [section, setSection] = useState(null);
  const [school, setSchool] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [blood, setBlood] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [contact, setContact] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [emergency, setEmergency] = useState('');
  const [photo, setPhoto] = useState(null);

  // Map states
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [placeName, setPlaceName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const classData = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
  ];

  const sectionData = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ];

  const requestPermissionsAndLocate = useCallback(async () => {
    try {
      const locationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      if (locationGranted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    requestPermissionsAndLocate();
  }, [requestPermissionsAndLocate]);

  // ─── Auto-focus map to user's current location ───────────────────────────────
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setMapRegion(region);
        setLocation({ latitude, longitude });
        getAddressFromCoordinates(latitude, longitude);

        // Animate map to user location
        if (mapRef.current) {
          mapRef.current.animateToRegion(region, 1000);
        }
      },
      error => {
        console.log('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  // ─── Nominatim reverse geocoding (free, no API key) ──────────────────────────
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
          headers: { 'User-Agent': 'StudentManagementApp/1.0' },
        },
      );

      const data = await response.json();

      if (data && data.address) {
        const addr = data.address;
        const cityName = addr.city || addr.town || addr.village || '';
        const stateName = addr.state || '';
        const zipCode = addr.postcode || '';
        const fullAddress = data.display_name || '';

        setPlaceName(fullAddress);
        setCity(cityName);
        setState(stateName);
        setZip(zipCode);
        setAddress1(fullAddress);
      }
    } catch (error) {
      console.log('Nominatim error:', error);
    }
  };

  useEffect(() => {
    if (route.params?.latitude) {
      const { latitude, longitude } = route.params;

      setLocation({ latitude, longitude });

      getAddressFromCoordinates(latitude, longitude);
    }
  }, [route.params]);

  // ─── Submit validation ────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter student name');
      return;
    }
    if (!photo) {
      Alert.alert('Required', 'Please capture a photo');
      return;
    }
    if (!location) {
      Alert.alert('Required', 'Please select a location on the map');
      return;
    }

    // TODO: Save to SQLite
    console.log('Submit:', {
      name,
      photo,
      latitude: location.latitude,
      longitude: location.longitude,
      placeName,
      studentClass,
      section,
      school,
      gender,
      dob,
      blood,
      father,
      mother,
      contact,
      address1,
      address2,
      city,
      state,
      zip,
      emergency,
    });

    try {
      db.execute(
        `INSERT INTO students 
  (name, photo, latitude, longitude, class, section, school,
  gender, dob, blood, father, mother, contact,
  address1, address2, city, state, zip, emergency, place_name)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          photo,
          location.latitude,
          location.longitude,
          studentClass,
          section,
          school,
          gender,
          dob,
          blood,
          father,
          mother,
          contact,
          address1,
          address2,
          city,
          state,
          zip,
          emergency,
          placeName,
        ],
      );

      console.log('Student inserted successfully');

      const result = db.execute('SELECT * FROM students');

      console.log('Total Students:', result.rows.length);

      for (let i = 0; i < result.rows.length; i++) {
        console.log('Student Row:', result.rows.item(i));
      }

      Alert.alert('Success', 'Student added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log('Insert Error:', error);
    }
  };

  const handleImagePick = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        saveToPhotos: false,
      },
      res => {
        if (res.assets) {
          setPhoto(res.assets[0].uri);
        }
      },
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Back Arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Typo variant="h4" color={COLORS.white}>
          Add Data
        </Typo>
        <View style={{ width: 20 }} />
      </View>

      {/* Photo capture — camera only */}
      <TouchableOpacity style={styles.imageBox} onPress={handleImagePick}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              photo
                ? { uri: photo }
                : require('../../assets/images/Group 1379.png')
            }
            style={styles.profile}
          />

          <View style={styles.cameraIcon}>
            <Image
              source={require('../../assets/images/interface (6).png')}
              // style={{ width: 18, height: 18, tintColor: '#fff' }}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.form}>
        {/* Name (compulsory) */}
        <Input label="Name *" value={name} onChangeText={setName} />

        {/* Class & Section */}
        <View style={styles.row}>
          <View style={styles.dropdownBox}>
            <Typo
              style={[
                styles.floatingLabel,
                studentClass && styles.floatingActive,
              ]}
            >
              Class
            </Typo>
            <Dropdown
              style={styles.dropdown}
              data={classData}
              labelField="label"
              valueField="value"
              value={studentClass}
              placeholder=""
              onChange={item => setStudentClass(item.value)}
            />
          </View>

          <View style={styles.dropdownBox}>
            <Typo
              style={[styles.floatingLabel, section && styles.floatingActive]}
            >
              Section
            </Typo>
            <Dropdown
              style={styles.dropdown}
              data={sectionData}
              labelField="label"
              valueField="value"
              value={section}
              placeholder=""
              onChange={item => setSection(item.value)}
            />
          </View>
        </View>

        <Input label="School name" value={school} onChangeText={setSchool} />

        {/* Gender */}
        <View style={styles.genderRow}>
          <Typo>Gender :</Typo>
          {['Male', 'Female'].map(g => (
            <TouchableOpacity
              key={g}
              style={styles.genderItem}
              onPress={() => setGender(g)}
            >
              <Image
                source={
                  gender === g
                    ? require('../../assets/images/Radiobutton_ on.png')
                    : require('../../assets/images/Radiobutton Off.png')
                }
                style={styles.radio}
              />
              <Typo>{g}</Typo>
            </TouchableOpacity>
          ))}
        </View>

        {/* DOB */}
        <TouchableOpacity onPress={() => setShowDate(true)}>
          <View style={styles.inputBox}>
            <Typo style={styles.label}>DOB</Typo>
            <View style={styles.inputRow}>
              <Typo>{dob || '--/--/----'}</Typo>
              <Image
                source={require('../../assets/images/calendar.png')}
                style={styles.icon}
              />
            </View>
          </View>
        </TouchableOpacity>

        {showDate && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDate(false);
              if (date) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                setDob(`${day}/${month}/${year}`);
              }
            }}
          />
        )}

        <Input label="Blood Group" value={blood} onChangeText={setBlood} />
        <Input label="Father's name" value={father} onChangeText={setFather} />
        <Input label="Mother's name" value={mother} onChangeText={setMother} />
        <Input
          label="Parent's contact no"
          value={contact}
          onChangeText={setContact}
        />
        <Input label="Address 1" value={address1} onChangeText={setAddress1} />
        <Input label="Address 2" value={address2} onChangeText={setAddress2} />
        <Input label="City" value={city} onChangeText={setCity} />
        <Input label="State" value={state} onChangeText={setState} />
        <Input label="Zip" value={zip} onChangeText={setZip} />
        <Input
          label="Emergency contact no"
          value={emergency}
          onChangeText={setEmergency}
        />

        {/* Map — auto-focused, draggable marker from start */}
        <Typo style={styles.mapLabel}>Select Location *</Typo>

        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={mapRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onPress={e => {
              const coordinate = e.nativeEvent.coordinate;
              setLocation(coordinate);
              getAddressFromCoordinates(
                coordinate.latitude,
                coordinate.longitude,
              );
            }}
          >
            {location && (
              <Marker
                coordinate={location}
                draggable
                onDragEnd={e => {
                  const coordinate = e.nativeEvent.coordinate;
                  setLocation(coordinate);
                  getAddressFromCoordinates(
                    coordinate.latitude,
                    coordinate.longitude,
                  );
                }}
              />
            )}
          </MapView>

          <View style={styles.mapBottom}>
            <Typo style={styles.locationText}>
              {selectedLocation
                ? `✅ ${selectedLocation}`
                : placeName
                ? `📍 ${placeName}`
                : 'Tap map to select location'}
            </Typo>
            <Button
              title="Select Location"
              style={styles.locationBtn}
              fullWidth={false}
              textStyle={{ fontSize: 12 }}
              onPress={() =>
                navigation.navigate('SelectLocationScreen', {
                  latitude: location?.latitude,
                  longitude: location?.longitude,
                })
              }
            />
          </View>
        </View>

        <Button
          title="Submit"
          style={{ marginTop: 20 }}
          onPress={handleSubmit}
          disabled={!name || !photo || !location}
        />
      </View>
    </ScrollView>
  );
}

const Input = ({ label, value, onChangeText }) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={styles.inputBox}>
      <Typo
        style={[
          styles.floatingLabel,
          (value || focus) && styles.floatingActive,
        ]}
      >
        {label}
      </Typo>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },

  header: {
    height: 70,
    backgroundColor: '#0E5F5C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  backIcon: { width: 20, height: 20 },

  imageBox: { alignItems: 'center', marginVertical: 20 },

  profile: { width: 120, height: 120, borderRadius: 60 },

  cameraTag: {
    marginTop: 8,
    backgroundColor: '#0E5F5C',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },

  cameraTagText: { color: '#fff', fontSize: 12 },

  form: { padding: 20 },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  dropdown: { height: 30 },

  inputBox: {
    borderWidth: 1,
    borderColor: '#BFD6D5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  floatingLabel: {
    position: 'absolute',
    left: 10,
    top: 18,
    color: '#6A9C9B',
  },

  floatingActive: {
    top: -8,
    fontSize: 12,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 4,
  },

  label: { color: '#6A9C9B', marginBottom: 5 },

  input: { fontSize: 16 },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: { width: 20, height: 20 },

  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 15,
  },

  genderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  radio: { width: 18, height: 18 },

  mapContainer: {
    borderWidth: 1,
    borderColor: '#BFD6D5',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: '#fff',
  },

  map: { height: 220, width: '100%' },

  mapLabel: { color: '#6A9C9B', marginTop: 0 },

  dropdownBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#BFD6D5',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: 55,
  },

  mapBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  locationText: {
    flex: 1,
    fontSize: 13,
    marginRight: 10,
  },

  locationBtn: {
    width: 'auto',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
