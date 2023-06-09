import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

export const firebaseConfig = {
    apiKey: "AIzaSyC_an6k5eeuD__RIpcY6PhgFLt3GIruSlw",
    authDomain: "duck-hunt-35693.firebaseapp.com",
    projectId: "duck-hunt-35693",
    storageBucket: "duck-hunt-35693.appspot.com",
    messagingSenderId: "573938170725",
    appId: "1:573938170725:web:89b4051e8a07c487b63f8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)