import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Typo from '../../components/Typo';
import db from '../../database/database';

export default function ViewStudentsScreen({ navigation }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    try {
      const result = db.execute('SELECT * FROM students');

      let list = [];

      for (let i = 0; i < result.rows.length; i++) {
        list.push(result.rows.item(i));
      }

      setStudents(list);

      console.log('Students loaded:', list);
    } catch (error) {
      console.log('Fetch Error:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        {/* Student Image */}
        <Image source={{ uri: item.photo }} style={styles.avatar} />

        {/* Student Details */}
        <View style={styles.details}>
          <Typo style={styles.name}>{item.name}</Typo>

          <Typo style={styles.info}>
            {item.class ? `${item.class}th Std` : '6th Std'} -
            {item.section ? item.section : 'A'} /
            {item.school ? item.school : 'ABC School'}
          </Typo>
        </View>

        {/* Arrow Button */}
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => {
            navigation.navigate('StudentDetails', { student: item });
          }}
        >
          <Image
            source={require('../../assets/images/trajectory.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    );
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

        <Typo style={styles.headerTitle}>View Data</Typo>

        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  card: {
    backgroundColor: '#EEF7FB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#0E5F5C',
  },

  details: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  info: {
    marginTop: 3,
    color: '#4b7b82',
  },

  arrowBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0E5F5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 60,
    backgroundColor: '#0E5F5C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },

  backArrow: {
    color: '#fff',
    fontSize: 24,
  },
});
