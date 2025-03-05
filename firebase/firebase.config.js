import 'dotenv/config'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dorm-system-bf714.firebaseapp.com",
  projectId: "dorm-system-bf714",
  storageBucket: "dorm-system-bf714.firebasestorage.app",
  messagingSenderId: "528294967959",
  appId: "1:528294967959:web:bc5bee056a309177e3c7d2"
};


const app = initializeApp(firebaseConfig);