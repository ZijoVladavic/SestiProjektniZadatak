if (sessionStorage.getItem("username") !== null) {
  if (sessionStorage.getItem("driver") === "true")
    window.open("driverdash.html", "_self");
  else window.open("riderdash.html", "_self");
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOQtubGSRkIg9CHxAZ7UADLLDH2PaCHTk",
  authDomain: "swift-77468.firebaseapp.com",
  projectId: "swift-77468",
  storageBucket: "swift-77468.appspot.com",
  messagingSenderId: "919125176468",
  appId: "1:919125176468:web:aa4158869971ced3040481",
  measurementId: "G-TX8L5CY54Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const usersCollection = collection(db, "users");

document.querySelector("#login").addEventListener("click", login);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    login();
  }
});

function login() {
  var isCorrect = false;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  getDocs(usersCollection).then((docs) => {
    docs.forEach((doc) => {
      if (doc.data().username === username && doc.data().pass === password) {
        isCorrect = true;
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("driver", doc.data().isDriver);
        sessionStorage.setItem("id", doc.id);
        if (doc.data().isDriver) window.open("driverdash.html", "_self");
        else window.open("riderdash.html", "_self");
      }
    });

    if (!isCorrect) {
      document.querySelector("#password").value = "";
      document.querySelector("#wrongPassword").style.visibility = "visible";
    }
  });
}
