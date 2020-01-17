import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWKKKy_-z7JYV3Bg44inqYujLx78k34gE",
    authDomain: "call-center-app-1555552514187.firebaseapp.com",
    databaseURL: "https://call-center-app-1555552514187.firebaseio.com",
    projectId: "call-center-app-1555552514187",
    storageBucket: "call-center-app-1555552514187.appspot.com",
    messagingSenderId: "261863546217",
    appId: "1:261863546217:web:dae375f9762c2f9ab771f8",
    measurementId: "G-EXC3ZKN6Y9"
  };

const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore();


export { app, db };