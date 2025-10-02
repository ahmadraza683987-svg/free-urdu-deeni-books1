// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAnalytics } from "firebase/analytics";

// 🔹 Firebase configuration (console se copy kiya hua)
const firebaseConfig = {
  apiKey: "AIzaSyDjlm2jzzybvYHraj5mlYbsLQ-ddHj_1hA",
  authDomain: "free-urdu-deeni-books-co-4f312.firebaseapp.com",
  projectId: "free-urdu-deeni-books-co-4f312",
  storageBucket: "free-urdu-deeni-books-co-4f312.firebasestorage.app",
  messagingSenderId: "860499663463",
  appId: "1:860499663463:web:c24d5acf83f4c24b9992c2",
  measurementId: "G-WBFHGZ3XPM"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Analytics (optional)
const analytics = getAnalytics(app);

// 🔹 Firestore Database (for comments)
export const db = getFirestore(app);

export default app;