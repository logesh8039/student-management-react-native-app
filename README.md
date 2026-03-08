# 📱 Student Management App (React Native)

A **Student Management Mobile Application** built with **React Native** that allows users to manage student records, capture student details, and visualize student locations on a map.

This project demonstrates mobile development skills including **form handling, local database usage, location services, and map integration**.

---

# 🚀 Features

- 👤 Add new student details
- 📋 View student list
- 🔍 View individual student details
- 🗺️ Select student location using map
- 📍 Display students on map view
- 🖼️ Capture or upload student profile image
- 🔐 Authentication screens (Sign In / Sign Up)
- 📱 Clean and modern mobile UI

---

# 🛠️ Tech Stack

- **React Native**
- **React Navigation**
- **SQLite (Local Database)**
- **Google Maps API**
- **React Native Maps**
- **React Native Image Picker**
- **React Native Permissions**
- **JavaScript / ES6**

---

# 📸 Screenshots

## Welcome Screen

![Welcome Screen](screenshots/Welcome_Screen.jpeg)

## Sign In

![Sign In](screenshots/SignIn.jpeg)

## Sign Up

![Sign Up](screenshots/SignUp.jpeg)

## Dashboard

![Dashboard](screenshots/Dashboard.jpeg)

## Add Student

![Add Student](screenshots/Add_Student.png)

## Student List

![Student List](screenshots/Student_List.png)

## Select Map Location

![Select Map](screenshots/Select_Map.png)

## Map View

![Map View](screenshots/Map_View.png)

## Student Details

![Student Details](screenshots/StudentDetails.png)

---

# 📦 Installation

Clone the repository:

```
git clone https://github.com/logesh8039/student-management-react-native-app.git
```

Go into the project folder:

```
cd student-management-react-native-app
```

Install dependencies:

```
npm install
```

Run Android app:

```
npx react-native run-android
```

---

# 🔑 Google Maps Setup

This project uses **Google Maps API**.

Add your API key inside:

```
android/app/src/main/AndroidManifest.xml
```

```
<meta-data
 android:name="com.google.android.geo.API_KEY"
 android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
```

Make sure the API key is **restricted to Android apps** in Google Cloud Console.

---

# 📂 Project Structure

```
student-management-react-native-app
│
├── android
├── ios
├── src
│   ├── components
│   ├── screens
│   ├── database
│   └── utils
│
├── screenshots
├── App.js
└── package.json
```

---

# 🎯 Purpose of the Project

This project was developed to demonstrate:

- Mobile UI development
- React Native architecture
- Map integration
- Location handling
- Local data storage
- Form validation and user interaction

---

# 👨‍💻 Author

**Logesh**

GitHub:
https://github.com/logesh8039

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.
