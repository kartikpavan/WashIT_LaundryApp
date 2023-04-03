import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-qAAspRX9e-eGpfqmCxDxKUxn0UfLOiI",
  authDomain: "washitapp-6e219.firebaseapp.com",
  projectId: "washitapp-6e219",
  storageBucket: "washitapp-6e219.appspot.com",
  messagingSenderId: "724121841152",
  appId: "1:724121841152:web:1a136dd0163555f212f2e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
