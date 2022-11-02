// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-ljt_akv5U0kXf1URjdyYkbhafea4KPI",
  authDomain: "schedule-e46e0.firebaseapp.com",
  projectId: "schedule-e46e0",
  storageBucket: "schedule-e46e0.appspot.com",
  messagingSenderId: "434828895616",
  appId: "1:434828895616:web:6452c2669a47312a8a8d65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth

const provider = new GoogleAuthProvider();

export const auth = getAuth(app)
export const db = getFirestore(app)

export const signInWithGoogle = () => signInWithPopup(auth, provider)