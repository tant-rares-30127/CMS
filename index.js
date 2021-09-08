import { initializeApp } from '/node_modules/firebase/app';
import { getFirestore, collection, getDocs } from '/node_modules/firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDxqcFls44cCSrDK60cbr6aBZh6ioImRtY",
  authDomain: "cms-madebyrares.firebaseapp.com",
  projectId: "cms-madebyrares",
  storageBucket: "cms-madebyrares.appspot.com",
  messagingSenderId: "121958132101",
  appId: "1:121958132101:web:d793d87dcb57e795973cec",
  measurementId: "G-HSRBRG5LWE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db=getFirestore(app);