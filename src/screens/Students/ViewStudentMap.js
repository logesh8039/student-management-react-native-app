import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Typo from '../../components/Typo';
import db from '../../database/database';

const StudentMarker = ({ student, navigation }) => {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  const photoSource = student.photo
    ? {
        uri: student.photo.startsWith('file://')
          ? student.photo
          : `file://${student.photo}`,
      }
    : require('../../assets/images/Group 1379.png');

  return (
    <Marker
      coordinate={{
        latitude: Number(student.latitude),
        longitude: Number(student.longitude),
      }}
      tracksViewChanges={tracksViewChanges}
    >
      <View style={styles.markerWrapper}>
        <Image
          source={photoSource}
          style={styles.markerImage}
          onLoad={() => {
            setTimeout(() => setTracksViewChanges(false), 500);
          }}
        />

        <View style={styles.pin} />
      </View>

      <Callout onPress={() => navigation.navigate('ViewStudent', { student })}>
        <View style={styles.callout}>
          <Text style={styles.calloutText}>{student.name}</Text>
        </View>
      </Callout>
    </Marker>
  );
};

// ─────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────
const ViewStudentMap = ({ navigation }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    try {
      const result = db.execute('SELECT * FROM students');

      const data = [];
      for (let i = 0; i < result.rows.length; i++) {
        data.push(result.rows.item(i));
      }

      setStudents(data);
    } catch (error) {
      console.log('Fetch Error:', error);
    }
  };

  const validStudents = students.filter(s => s.latitude && s.longitude);

  const initialRegion =
    validStudents.length > 0
      ? {
          latitude: Number(validStudents[0].latitude),
          longitude: Number(validStudents[0].longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      : {
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Back Arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Typo style={styles.headerTitle}>Map View</Typo>

        <View style={{ width: 30 }} />
      </View>

      {/* MAP */}
      <MapView style={styles.map} initialRegion={initialRegion}>
        {validStudents.map(student => (
          <StudentMarker
            key={student.id}
            student={student}
            navigation={navigation}
          />
        ))}
      </MapView>
    </View>
  );
};

export default ViewStudentMap;

// ─────────────────────────────────────────
// Styles
// ─────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 70,
    backgroundColor: '#0E5F5C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  map: {
    flex: 1,
  },

  markerWrapper: {
    alignItems: 'center',
  },

  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#6fa6a8',
    backgroundColor: '#fff',
  },

  pin: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#6fa6a8',
    marginTop: -2,
  },

  callout: {
    backgroundColor: '#cfe3e6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    width: 140,
    alignItems: 'center',
  },

  calloutText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
