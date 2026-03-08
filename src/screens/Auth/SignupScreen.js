import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import db, { getAllUsers } from '../../database/database';
import COLORS from '../../utils/colors';
import Typo from '../../components/Typo';
import FONTS from '../../utils/fonts';
import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  // const handleSignup = () => {
  //   if (!username || !phone || !password || !confirmPassword) {
  //     Alert.alert('Error', 'All fields are required');
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     Alert.alert('Error', 'Passwords do not match');
  //     return;
  //   }

  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'INSERT INTO users (username, phone, password) VALUES (?, ?, ?);',
  //       [username, phone, password],
  //       (tx, results) => {
  //         console.log('Insert success:', results);
  //         Alert.alert('Success', 'Account created');
  //         navigation.navigate('Login');
  //       },
  //       (tx, error) => {
  //         console.log('SQL ERROR:', error);
  //         Alert.alert('Database Error', error.message);
  //       },
  //     );
  //   });
  // };

  const handleSignup = () => {
  if (!username || !phone || !password || !confirmPassword) {
    Alert.alert('Error', 'All fields are required');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  try {
    db.execute(
      'INSERT INTO users (username, phone, password) VALUES (?, ?, ?)',
      [username, phone, password],
    );

    Alert.alert('Success', 'Account created');
    navigation.navigate('Login');
  } catch (error) {
    Alert.alert('Database Error', error.message);
  }
};

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              source={require('../../assets/images/Intersection 3.png')}
              style={styles.bgImage}
            />
            <Image
              source={require('../../assets/images/Group 246.png')}
              style={styles.boyImage}
            />
            <View style={styles.formContainer}>
              <Typo
                variant="h1"
                color={COLORS.primary}
                style={{
                  fontSize: 26,
                  fontFamily: FONTS.bold,
                  marginBottom: 20,
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                Sign Up
              </Typo>

              <TextInput
                style={styles.input}
                placeholder="User Name"
                placeholderTextColor={COLORS.accent}
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone no"
                placeholderTextColor={COLORS.accent}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.accent}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={COLORS.accent}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <Button
                title="Sign Up"
                onPress={handleSignup}
                style={{ marginTop: 10 }}
              />
            </View>
            <Typo variant="p" color={COLORS.accent} style={{ marginTop: 15 }}>
              Already have an account?{' '}
              <Typo
                variant="p"
                color={COLORS.primary}
                onPress={() => navigation.navigate('Login')}
              >
                Sign In
              </Typo>
            </Typo>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    height: 380,
  },
  boyImage: {
    width: 280,
    height: 220,
    resizeMode: 'contain',
    marginTop: 40,
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: COLORS.lightAccent,
    borderRadius: 8,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    color: COLORS.accent,
    marginBottom: 10,
    backgroundColor: 'transparent',
    fontSize: 18,
    fontFamily: FONTS.regular,
  },
});
