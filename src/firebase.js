import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to Firebase Authentication
const auth = getAuth(app);

export { app, auth };
