import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyD_teSPqKYFtgnQGJzqrfdI4GdctrvwKXU',
  authDomain: 'peer-paint.firebaseapp.com',
  databaseURL: 'https://peer-paint.firebaseio.com',
  projectId: 'peer-paint',
});

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
