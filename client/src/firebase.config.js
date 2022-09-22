import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "react-dashboard-8dd22.firebaseapp.com",
  projectId: "react-dashboard-8dd22",
  storageBucket: "react-dashboard-8dd22.appspot.com",
  messagingSenderId: "63474084207",
  appId: "1:63474084207:web:5f08f5d4ce4c49f183a09a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
