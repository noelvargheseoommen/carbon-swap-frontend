import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD6PAMfj9RcdJlfmdz9ou121KLz4OzqFgA",
  authDomain: "carbonswap-ebc0b.firebaseapp.com",
  databaseURL:
    "https://carbonswap-ebc0b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carbonswap-ebc0b",
  storageBucket: "carbonswap-ebc0b.appspot.com",
  messagingSenderId: "388668719085",
  appId: "1:388668719085:web:10c76bf63e32b4bd34f1e4",
  measurementId: "G-TV1DBZ6C9G",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
