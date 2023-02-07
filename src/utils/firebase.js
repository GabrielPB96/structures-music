// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { State } from "../components/metronome/models/state.enum";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4rRcYWm6OG7uoZVX6LB6Y8LKmr3Yo6S4",
  authDomain: "music-structures.firebaseapp.com",
  projectId: "music-structures",
  storageBucket: "music-structures.appspot.com",
  messagingSenderId: "207761468662",
  appId: "1:207761468662:web:69a6a040a13e486c6f50d7",
  measurementId: "G-58S86KLYQW",
  databaseURL: "https://music-structures-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
const PATH_USERS = "/users/";
export function s(ob, idUser) {
  set(ref(db, `${PATH_USERS}${idUser}`), ob);
}

export async function readUser(idUser) {
  return new Promise((solve, reject) => {
    onValue(ref(db, `${PATH_USERS}${idUser}`), (snapshot) => {
      const data = snapshot.val();
      solve(data);
    });
  });
}
