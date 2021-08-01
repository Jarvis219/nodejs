import firebase from "firebase/app";
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzIaWXbUJ2EdCEpB1-4q88GpxqOG77frM",
    authDomain: "ahsion.firebaseapp.com",
    projectId: "ahsion",
    storageBucket: "ahsion.appspot.com",
    messagingSenderId: "779416145400",
    appId: "1:779416145400:web:4c5e52d090e31d86151a0d",
    measurementId: "G-QSSC006VJ3"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;