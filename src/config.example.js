// --- TEMPLATE FILE ---
// Instructions: 
// 1. Rename this file to 'config.js'
// 2. Replace the placeholder values with your actual Firebase project credentials
// 3. Ensure 'config.js' is listed in your .gitignore file

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it
export const auth = getAuth(app);

// These exports are required by your App.js logic
export const __app_id = 'YOUR_APP_ID_OR_NAME';
export const __firebase_config = JSON.stringify(firebaseConfig);
export const __initial_auth_token = null;