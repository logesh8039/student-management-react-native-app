/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Button from '../../components/Button';
import Typo from '../../components/Typo';
import FONTS from '../../utils/fonts';
import COLORS from '../../utils/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/Group 1432.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Typo
          variant="h1"
          color={COLORS.primary}
          style={{ fontSize: 50, fontFamily: FONTS.bold }}
        >
          Student
        </Typo>
        <Typo
          variant="h1"
          color={COLORS.primary}
          style={{ fontSize: 50, fontFamily: FONTS.bold }}
        >
          App...
        </Typo>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={() => navigation.navigate('Login')} />
      </View>
      <View style={styles.footer}>
        <Typo variant="p" color={COLORS.accent}>
          Don't have an account?{' '}
          <Typo
            variant="p"
            color={COLORS.primary}
            onPress={() => navigation.navigate('Signup')}
          >
            SignUp
          </Typo>
        </Typo>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  imageContainer: {
    width: '100%',
    position: 'relative',
    top: 0,
    right: 0,
  },

  image: {
    width: '100%',
    objectFit: 'cover',
  },

  textContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
  },

  buttonContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
  },

  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
});
