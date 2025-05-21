// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDDL7qgjR0hyP_8r1A18fOC7Y3lZ4r6yw",
  authDomain: "gestor-torneos-aeef0.firebaseapp.com",
  projectId: "gestor-torneos-aeef0",
  storageBucket: "gestor-torneos-aeef0.firebasestorage.app",
  messagingSenderId: "18853189751",
  appId: "1:18853189751:web:61620d794e930c6007ce72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export {db, auth, storage};