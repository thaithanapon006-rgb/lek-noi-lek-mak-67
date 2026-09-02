// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA20RQUwRmL_VTSmyV5qgRQgyd3734KXQg",
  authDomain: "lek-noi-lek-mak-67.firebaseapp.com",
  databaseURL: "https://lek-noi-lek-mak-67-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lek-noi-lek-mak-67",
  storageBucket: "lek-noi-lek-mak-67.firebasestorage.app",
  messagingSenderId: "793303507658",
  appId: "1:793303507658:web:429b9682ab971d642b0a33",
  measurementId: "G-X7EM6X6641"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
