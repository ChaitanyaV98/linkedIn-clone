
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcFuzVyL0V_teEiIKQ2CFZOOHsH5dQyMY",
    authDomain: "linkedin-clone-yt-87c29.firebaseapp.com",
    projectId: "linkedin-clone-yt-87c29",
    storageBucket: "linkedin-clone-yt-87c29.appspot.com",
    messagingSenderId: "646574188263",
    appId: "1:646574188263:web:5880177e3dc61490cd2442",
    measurementId: "G-L3Q8QMNC26"
  };

//   const firebaseApp = firebase.initializeApp(firebaseConfig)
//   const db = firebaseApp.firestore();
//   const auth= firebase.auth()
  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseApp);
  const auth= getAuth(firebaseApp);

  export {db, auth}