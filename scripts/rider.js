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
const ridesCollection = collection(db, "rides");

if (sessionStorage.getItem("driver") === "true") {
  window.open("driverdash.html", "_self");
}

const jobs = document.querySelector(".jobs");
getDocs(ridesCollection)
  .then((docs) => {
    docs.forEach((doc) => {
      jobs.innerHTML +=
        "<div class='job' id='" +
        doc.id +
        "'><img src='rider.png' class='rider-icon' /><div class='job-data'>" +
        doc.data().distanceUnit +
        "s: " +
        doc.data().distance.toFixed(1) +
        "</div><div class='job-data'>Passengers: " +
        doc.data().passengers +
        "</div><div class='job-data'>Cost: " +
        doc.data().cost +
        "KM</div><button class='delete-job'>Delete</button></div>";
    });
  })
  .then(() => {
    const deletes = document.querySelectorAll(".delete-job");
    deletes.forEach((adelete) => {
      adelete.addEventListener("click", () => {
        const ride = doc(db, "rides", adelete.parentElement.id);
        deleteDoc(ride).catch((error) => {
          console.log(error);
        });
        adelete.parentElement.remove();
      });
    });
  });
