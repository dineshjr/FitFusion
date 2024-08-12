import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDspSdYiCPacnf4LGCXGoUzXF3I5nsFp0",
  authDomain: "sacred-tenure-373511.firebaseapp.com",
  projectId: "sacred-tenure-373511",
  storageBucket: "sacred-tenure-373511.appspot.com",
  messagingSenderId: "1090845634139",
  appId: "1:1090845634139:web:9d31cb75264822c0ed597e",
  measurementId: "G-WLFV4FN3NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export {db, auth, provider };

