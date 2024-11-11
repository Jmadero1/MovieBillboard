import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwTLcqsLYGUFn0UOMUqskyiA9guRtEdys",
  authDomain: "movie-billboard.firebaseapp.com",
  projectId: "movie-billboard",
  storageBucket: "movie-billboard.firebasestorage.app",
  messagingSenderId: "192872739873",
  appId: "1:192872739873:web:fa06f47c9a6edb6a411f60",
  measurementId: "G-2CZETKJJ51"
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Instancias de Firebase
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export default { auth, provider, db, signInWithPopup, signInAnonymously };
