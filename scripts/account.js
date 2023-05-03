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

var isDown = false;

document.getElementById("label-name").addEventListener("click", () => {
  if (isDown) {
    document.querySelector("#accdropdown").style.visibility = "hidden";
    isDown = false;
  } else {
    document.querySelector("#accdropdown").style.visibility = "visible";
    isDown = true;
  }
});

if (sessionStorage.getItem("username") === null) {
  window.open("index.html", "_self");
}

document.getElementById("logout").addEventListener("click", logOut);

document.querySelector("#label-name").innerHTML =
  sessionStorage.getItem("username");

document.getElementById("deleteacc").addEventListener("click", () => {
  document.querySelector("#deleteconfirm").style.visibility = "visible";
});
document.getElementById("no").addEventListener("click", () => {
  document.querySelector("#deleteconfirm").style.visibility = "hidden";
});
document.getElementById("yes").addEventListener("click", () => {
  document.querySelector("#deleteconfirm").style.visibility = "hidden";
  //
  //delete acc
  //
  deleteAccount();
  logOut();
});

function deleteAccount() {
  const id = sessionStorage.getItem("id");
  const user = doc(db, "users", id);

  deleteDoc(user).catch((error) => {
    console.log(error);
  });
}

document.getElementById("editacc").addEventListener("click", () => {
  //edit acc
});

function logOut() {
  sessionStorage.clear();
  window.open("index.html", "_self");
}
