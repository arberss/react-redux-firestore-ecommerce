import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
  apiKey: 'AIzaSyAgmEJFCQXJPfV1iG2ueUNVkW0rAWmXpc0',
  authDomain: 'my-ecommerce-162e2.firebaseapp.com',
  projectId: 'my-ecommerce-162e2',
  storageBucket: 'my-ecommerce-162e2.appspot.com',
  messagingSenderId: '77918569842',
  appId: '1:77918569842:web:a6adbd41ca6e167f7e49eb',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
