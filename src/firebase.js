import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCbeVXh26CmIuSIFSVsidJZUG7YyZaY7tM",
  authDomain: "jcchatrealtime.firebaseapp.com",
  projectId: "jcchatrealtime",
  storageBucket: "jcchatrealtime.appspot.com",
  messagingSenderId: "724533339187",
  appId: "1:724533339187:web:b55efceaf4798e2ebe2f46",
  databaseURL: "https://jcchatrealtime-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {
    database,
}