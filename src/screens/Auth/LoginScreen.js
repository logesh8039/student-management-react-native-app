import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../../database/database';
import COLORS from '../../utils/colors';
import Typo from '../../components/Typo';
import FONTS from '../../utils/fonts';
import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //   if (!username || !password) {
  //     Alert.alert('Error', 'Username and password required');
  //     return;
  //   }

  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'SELECT * FROM users WHERE username = ? AND password = ?;',
  //       [username, password],
  //       (txObj, { rows }) => {
  //         if (rows.length > 0) {
  //           setIsLoggedIn(true); // ✅ switch to HomeScreen
  //         } else {
  //           Alert.alert('Error', 'Invalid credentials');
  //         }
  //       },
  //       error => Alert.alert('Error', 'Login failed'),
  //     );
  //   });
  // };

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and password required');
      return;
    }

    try {
      const result = db.execute(
        'SELECT * FROM users WHERE username=? AND password=?',
        [username, password],
      );

      if (result.rows.length > 0) {
        setIsLoggedIn(true);
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              source={require('../../assets/images/Intersection 4.png')}
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
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  width: '100%',
                }}
              >
                Sign In
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
                placeholder="Password"
                placeholderTextColor={COLORS.accent}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Typo
                variant="p"
                color={COLORS.accent}
                style={{ alignSelf: 'flex-end', marginBottom: 10 }}
              >
                Forget Password ?
              </Typo>

              <Button
                title="Log In"
                onPress={handleLogin}
                style={{ marginTop: 10 }}
              />
            </View>

            <Typo variant="p" color={COLORS.accent} style={{ marginTop: 15 }}>
              Don't have an account?{' '}
              <Typo
                variant="p"
                color={COLORS.primary}
                onPress={() => navigation.navigate('Signup')}
              >
                Sign Up
              </Typo>
            </Typo>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: COLORS.white },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    height: 380,
  },
  boyImage: { width: 280, height: 220, resizeMode: 'contain', marginTop: 140 },
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
