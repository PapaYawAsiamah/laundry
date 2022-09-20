// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5s9F9V3VmXu4O08HC6oGtTpk5-_JFzwk",
  authDomain: "pronto-7e4d9.firebaseapp.com",
  projectId: "pronto-7e4d9",
  storageBucket: "pronto-7e4d9.appspot.com",
  messagingSenderId: "273591706658",
  appId: "1:273591706658:web:63992e54fd46b5bd83567b",
  measurementId: "G-Z8SCVFXLQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);



export { db };
