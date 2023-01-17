// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcNqVlt5FDPPQab-ZC_YyNLTC7g4tinc4',
  authDomain: 'awesomeproject-93b38.firebaseapp.com',
  databaseURL:
    'https://awesomeproject-93b38-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'awesomeproject-93b38',
  storageBucket: 'awesomeproject-93b38.appspot.com',
  messagingSenderId: '847654405556',
  appId: '1:847654405556:web:24c233b0ca7f17a0119ee1',
  measurementId: 'G-TFXPYEGX10',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};
