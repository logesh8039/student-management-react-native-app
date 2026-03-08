import { open } from 'react-native-quick-sqlite';

const db = open({ name: 'studentApp.db' });

/* ---------------- USERS TABLE ---------------- */

db.execute(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  phone TEXT,
  password TEXT
);
`);

/* ---------------- STUDENTS TABLE ---------------- */

db.execute(`
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  photo TEXT,
  latitude REAL,
  longitude REAL,
  class TEXT,
  section TEXT,
  school TEXT,
  gender TEXT,
  dob TEXT,
  blood TEXT,
  father TEXT,
  mother TEXT,
  contact TEXT,
  address1 TEXT,
  address2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  emergency TEXT,
  place_name TEXT
);
`);

/* ---------------- GET USERS ---------------- */

export const getAllUsers = () => {
  try {
    const result = db.execute('SELECT * FROM users');

    console.log('Rows length:', result.rows.length);

    for (let i = 0; i < result.rows.length; i++) {
      console.log(result.rows.item(i));
    }
  } catch (error) {
    console.log('Error fetching users', error);
  }
};

/* ---------------- GET STUDENTS ---------------- */

export const getAllStudents = () => {
  try {
    const result = db.execute('SELECT * FROM students');

    console.log('Students:', result.rows.length);

    let students = [];

    for (let i = 0; i < result.rows.length; i++) {
      students.push(result.rows.item(i));
    }

    return students;
  } catch (error) {
    console.log('Error fetching students', error);
    return [];
  }
};

export default db;
