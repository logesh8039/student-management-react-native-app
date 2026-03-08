import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function StudentDetailsScreen({ route, navigation }) {
  const { student } = route.params;

  const latitude = student.latitude || 13.0827;
  const longitude = student.longitude || 80.2707;

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: '100%' }}
        >
          <Image
            source={require('../../assets/images/Back Arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {/* PROFILE */}
        <View style={styles.profileSection}>
          <Image source={{ uri: student.photo }} style={styles.profileImage} />

          <Text style={styles.name}>{student.name}</Text>

          <Text style={styles.classText}>
            {student.class || 6} Standard "{student.section || 'A'}" Section
          </Text>

          <Text style={styles.school}>{student.school || 'ABC School'}</Text>
        </View>

        {/* INFO BOXES */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Gender</Text>
            <Text style={styles.infoValue}>{student.gender || 'Male'}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>DOB</Text>
            <Text style={styles.infoValue}>{student.dob || '-'}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Blood</Text>
            <Text style={styles.infoValue}>{student.blood || '-'}</Text>
          </View>
        </View>
      </View>

      {/* PARENT DETAILS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Parents Details</Text>

        <Row label="Father's name" value={student.father || '-'} />
        <Row label="Mother's name" value={student.mother || '-'} />
        <Row label="Contact no." value={student.contact || '-'} />
        <Row label="Emergency contact no." value={student.emergency || '-'} />
      </View>

      {/* ADDRESS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Residential Details</Text>

        <Row label="Address 1" value={student.address1 || '-'} />
        <Row label="Address 2" value={student.address2 || '-'} />
        <Row label="City" value={student.city || '-'} />
        <Row label="State" value={student.state || '-'} />
        <Row label="Zip" value={student.zip || '-'} />
      </View>

      {/* MAP */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Location</Text>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={student.name}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    backgroundColor: '#0E5F5C',
    paddingBottom: 30,
    alignItems: 'center',
  },

  backIcon: {
    width: 25,
    height: 25,
    alignSelf: 'flex-start',
    margin: 20,
  },

  profileSection: {
    alignItems: 'center',
  },

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#cde3e4',
  },

  name: {
    fontSize: 28,
    color: '#fff',
    marginTop: 10,
    fontWeight: '600',
  },

  classText: {
    color: '#cde3e4',
    marginTop: 5,
    fontSize: 16,
  },

  school: {
    color: '#cde3e4',
    fontSize: 16,
  },

  infoRow: {
    flexDirection: 'row',
    marginTop: 20,
  },

  infoBox: {
    backgroundColor: '#d6e3e6',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: 'center',
    width: 100,
  },

  infoTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },

  infoValue: {
    color: '#4b7b82',
    width: 80,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    borderWidth: 1,
    borderColor: '#cde3e4',
  },

  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#0E5F5C',
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 6,
    gap: 10,
  },

  label: {
    color: '#7aa1a3',
    width: '40%',
  },

  value: {
    color: '#4b7b82',
    flex: 1,
    textAlign: 'left',
    flexWrap: 'wrap',
  },

  map: {
    height: 180,
    borderRadius: 10,
  },
});
