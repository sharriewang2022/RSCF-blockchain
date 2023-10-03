import firebase from "firebase/app"
import firebaseAuth from "firebase/auth"
import firebaseDatabase from "firebase/database"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
  }; 

  firebase.initializeApp(firebaseConfig);
  export const auth = firebaseAuth
  export default firebaseConfig;

  export const database = firebaseDatabase