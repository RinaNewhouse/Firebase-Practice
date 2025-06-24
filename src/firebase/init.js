// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIR5JHzAE_XD4rh3kyji9V9VFLInNotlM",
  authDomain: "fir-practice-55f2a.firebaseapp.com",
  projectId: "fir-practice-55f2a",
  storageBucket: "fir-practice-55f2a.firebasestorage.app",
  messagingSenderId: "839508487358",
  appId: "1:839508487358:web:8d22fc95e82b5e4d3242ef",
  measurementId: "G-S8KERRNK9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
