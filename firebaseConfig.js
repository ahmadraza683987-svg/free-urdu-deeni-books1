// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 🔹 Firestore import for comments

const firebaseConfig = {
  apiKey: "AIzaSyCDvXaKGUjYwc2Ly4PBBoKJVobdulVs8js",
  authDomain: "free-urdu-deeni-books-comments.firebaseapp.com",
  projectId: "free-urdu-deeni-books-comments",
  storageBucket: "free-urdu-deeni-books-comments.appspot.com",
  messagingSenderId: "364160557039",
  appId: "1:364160557039:web:583ab4296a72a4eeb2a01a"
};

// 🔹 Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔹 Initialize Firestore for comments
export const db = getFirestore(app);

export default app;