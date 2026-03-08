import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Typo from '../../components/Typo';
import COLORS from '../../utils/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerBg}>
        <Image
          source={require('../../assets/images/Intersection 4.png')}
          style={styles.headerBgImg}
        />
      </View>
      <View style={styles.header}>
        <View style={styles.topIcons}>
          <Image
            source={require('../../assets/images/multimedia.png')}
            style={styles.menuIcon}
          />

          <View style={styles.profileCircle} />
        </View>

        <Typo variant="p" color="#B7D0CF">
          Welcome to
        </Typo>

        <Typo variant="h2" color={COLORS.white}>
          Student Database App
        </Typo>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('AddStudent')}
        >
          <View style={styles.iconCircle}>
            <Image
              source={require('../../assets/images/Add.png')}
              style={styles.icon}
            />
          </View>

          <Typo variant="h5" align="center">
            Add{'\n'}Student
          </Typo>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ViewStudentScreen')}
        >
          <View style={styles.iconCircle}>
            <Image
              source={require('../../assets/images/arrows (2).png')}
              style={styles.icon}
            />
          </View>

          <Typo variant="h5" align="center">
            View{'\n'}Student
          </Typo>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('MapView')}
        >
          <View style={styles.iconCircle}>
            <Image
              source={require('../../assets/images/maps-and-location.png')}
              style={styles.icon}
            />
          </View>

          <Typo variant="h5" align="center">
            Map{'\n'}View
          </Typo>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../assets/images/Group 247.png')}
        style={styles.studentImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    position: 'relative',
  },

  header: {
    // backgroundColor: '#0E5F5C',
    padding: 24,
    height: 280,
    justifyContent: 'center',
    position: 'relative',
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 400,
  },
  headerBgImg: {
    height: 350,
  },
  topIcons: {
    position: 'absolute',
    top: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    width: 28,
    height: 28,
    tintColor: 'white',
  },

  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: '#D9D9D9',
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -70,
    marginHorizontal: 24,
  },

  card: {
    width: 95,
    height: 140,
    backgroundColor: '#DCE7E6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: '#2E6F6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },

  studentImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 50,
    opacity: 0.6,
  },
});
