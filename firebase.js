// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs_Fx9fncDn06f9EgGEb_GLSgQDRSt83c",
  authDomain: "pantry-tracker-ae6ed.firebaseapp.com",
  projectId: "pantry-tracker-ae6ed",
  storageBucket: "pantry-tracker-ae6ed.appspot.com",
  messagingSenderId: "318649772909",
  appId: "1:318649772909:web:5a9d919ace09a9d2d08864",
  measurementId: "G-T4V6F4MMQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export{firestore};