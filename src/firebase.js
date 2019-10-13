import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyD_teSPqKYFtgnQGJzqrfdI4GdctrvwKXU',
  authDomain: 'peer-paint.firebaseapp.com',
  databaseURL: 'https://peer-paint.firebaseio.com',
  projectId: 'peer-paint',
  // storageBucket: 'peer-paint.appspot.com',
  // messagingSenderId: '834583873655',
  // appId: '1:834583873655:web:ebf18810d63e532bb59e72',
});

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
