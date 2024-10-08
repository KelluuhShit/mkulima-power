import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDcVaKnAnMisHCYOyfb2IJsfs-PemXFZIY",
    authDomain: "mkulima-power-185aa.firebaseapp.com",
    projectId: "mkulima-power-185aa",
    storageBucket: "mkulima-power-185aa.appspot.com",
    messagingSenderId: "576428444338",
    appId: "1:576428444338:web:5d5c06a61574a6090697ab",
    measurementId: "G-VQNHZ8JHDS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export auth and db
export { auth, db };
