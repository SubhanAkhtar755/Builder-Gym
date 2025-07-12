// src/config/Firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updatePassword
} from "firebase/auth";
import {
  getFirestore,
  enableIndexedDbPersistence,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue,
  get,
  child,
} from "firebase/database";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBJS8dXJbVQgzLbYC6RI_In7pUTTGc8Q_4",
  authDomain: "gym-builder-86a11.firebaseapp.com",
  projectId: "gym-builder-86a11",
  storageBucket: "gym-builder-86a11.firebasestorage.app",
  messagingSenderId: "875020143181",
  appId: "1:875020143181:web:3df7e9f77c2c5f2a6dea04",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth, Firestore, Realtime DB, Storage
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

// ✅ Enable Firestore Offline Support
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn("⚠️ Offline support failed: Multiple tabs open.");
  } else if (err.code === 'unimplemented') {
    console.warn("⚠️ Offline support is not supported in this browser.");
  }
});

// ✅ Export everything
export {
  auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  doc,
  setDoc,
  db,
  getDoc,
  ref,
  set,
  database,
  collection,
  addDoc,
  update,
  remove,
  onValue,
  get,
  child,
  storage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  uploadBytes,
  updateDoc,
  updatePassword,
  getDocs,
  query,
  where
};
