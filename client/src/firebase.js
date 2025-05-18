// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a3de1.firebaseapp.com",
  projectId: "mern-estate-a3de1",
  storageBucket: "mern-estate-a3de1.firebasestorage.app",
  messagingSenderId: "810393928309",
  appId: "1:810393928309:web:e71c8c2ec31033fdd3ee3c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);