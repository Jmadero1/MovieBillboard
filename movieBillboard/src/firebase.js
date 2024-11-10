import firebase from "firebase/compat/app";



const firebaseConfig = {
    apiKey: "AIzaSyCwTLcqsLYGUFn0UOMUqskyiA9guRtEdys",
    authDomain: "movie-billboard.firebaseapp.com",
    projectId: "movie-billboard",
    storageBucket: "movie-billboard.firebasestorage.app",
    messagingSenderId: "192872739873",
    appId: "1:192872739873:web:fa06f47c9a6edb6a411f60",
    measurementId: "G-2CZETKJJ51"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  


  const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;