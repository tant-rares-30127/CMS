import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

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
const db=getFirestore(firebaseApp);
const querySnapshot = await getDocs(collection(db, "members"));

function WriteMember(){
  var i=0;
  querySnapshot.forEach(element => {
    console.log(element.data()["first-name"]);
    console.log(element.data()["last-name"]);
    console.log(element.data()["email"]);
    console.log(element.data()["sex"]);
    console.log(element.data()["birthdate"].toDate());
  });
}

WriteMember();
