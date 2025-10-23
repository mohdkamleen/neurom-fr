import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKZpfkhxIuqr4VakjqLle-WkYvN88BLus",
    authDomain: "moonsonengineers.firebaseapp.com",
    projectId: "moonsonengineers",
    storageBucket: "moonsonengineers.appspot.com",
    messagingSenderId: "472624463377",
    appId: "1:472624463377:web:a7ccb67173a2710a8b3bb0",
    measurementId: "G-4F0W4GL0ME"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, firebase };
