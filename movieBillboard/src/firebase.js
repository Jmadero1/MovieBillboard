import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";  // Importa también signInAnonymously
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwTLcqsLYGUFn0UOMUqskyiA9guRtEdys",
  authDomain: "movie-billboard.firebaseapp.com",
  projectId: "movie-billboard",
  storageBucket: "movie-billboard.firebasestorage.app",
  messagingSenderId: "192872739873",
  appId: "1:192872739873:web:fa06f47c9a6edb6a411f60",
  measurementId: "G-2CZETKJJ51"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, signInWithPopup, signInAnonymously };  // Exporta también signInAnonymously
