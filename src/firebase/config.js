import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Firebase config aqui embaixo
const firebaseConfig = {
    apiKey: "AIzaSyDOKW48g92woNVQT78Dl5E4DntyAIKFuUE",
    authDomain: "adlytik.firebaseapp.com",
    projectId: "adlytik",
    storageBucket: "adlytik.appspot.com",
    messagingSenderId: "1051632960127",
    appId: "1:1051632960127:web:d4f54f0fdfd7d9b40cf54a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = initializeFirestore(firebaseApp, {
    ignoreUndefinedProperties: true,
});
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Timestamp
const timestamp = serverTimestamp();

export { db, auth, storage, timestamp };
