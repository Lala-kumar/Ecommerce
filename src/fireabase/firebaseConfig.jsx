// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPGsVEwlgf2-AORfK1n_Cr6xxq7qRwRfE",
  authDomain: "ecommerce-c82c5.firebaseapp.com",
  projectId: "ecommerce-c82c5",
  storageBucket: "ecommerce-c82c5.appspot.com",
  messagingSenderId: "146194067782",
  appId: "1:146194067782:web:1b0fbdb9a7d7c82703f547",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
 