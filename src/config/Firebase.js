// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBVdcpwBkPNGWV3dIoxJReoovLDAEYJxGA",
  authDomain: "hirein-71c6b.firebaseapp.com",
  projectId: "hirein-71c6b",
  storageBucket: "hirein-71c6b.appspot.com",
  messagingSenderId: "829766902846",
  appId: "1:829766902846:web:50a6c927cf0573ce059d6f",
  measurementId: "G-01DBD8ZXSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()