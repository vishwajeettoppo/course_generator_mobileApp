// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1plmwXJP2IpZkjKaDsIlJ6MeVG1_u4Bw",
  authDomain: "selfed-d2ac1.firebaseapp.com",
  projectId: "selfed-d2ac1",
  storageBucket: "selfed-d2ac1.firebasestorage.app",
  messagingSenderId: "976873691136",
  appId: "1:976873691136:web:a42cf7fc0fb0475d7260e5",
  measurementId: "G-DRL17NYS4X",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Configure authentication with platform-specific persistence
let auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics if supported
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized");
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
});
