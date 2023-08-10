import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // Your Firebase configuration object here
  apiKey: "AIzaSyBMVQLXDXsbqCfHBJqzAKCb-d1ac1F8DYs",
  authDomain: "car-parking-reservation-100ae.firebaseapp.com",
  databaseURL: "https://car-parking-reservation-100ae-default-rtdb.firebaseio.com",
  projectId: "car-parking-reservation-100ae",
  storageBucket: "car-parking-reservation-100ae.appspot.com",
  messagingSenderId: "498491899457",
  appId: "1:498491899457:web:50009bdb7eaa606cc9d0c0",
  measurementId: "G-C92R9YPC2R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);

export default {app,database};
