import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

const firebaseConfig = {
      apiKey: "AIzaSyAsgoY0yEbFOQy6DvIzG7224qg2zLpDN0Q",
      authDomain: "schedule-management-app-5df19.firebaseapp.com",
      projectId: "schedule-management-app-5df19",
      storageBucket: "schedule-management-app-5df19.appspot.com",
      messagingSenderId: "970256092549",
      appId: "1:970256092549:web:10583f25f11844bd8988ec",
      measurementId: "G-VENS65FFQW"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for database
const db = firebaseApp.firestore();

export default db;