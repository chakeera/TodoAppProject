import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAi-hVktRSlnGw1xIhLakT6uQfdz17tvv8',
  authDomain: 'todoapp-43951.firebaseapp.com',
  projectId: 'todoapp-43951',
  storageBucket: 'todoapp-43951.appspot.com',
  messagingSenderId: '29504537265',
  appId: '1:29504537265:web:2092fe9b2677a458679890',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
