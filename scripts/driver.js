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

if (sessionStorage.getItem("driver") === "false") {
  window.open("riderdash.html", "_self");
}

const jobs = document.querySelector(".jobs");
getDocs(ridesCollection)
  .then((docs) => {
    docs.forEach((doc) => {
      jobs.innerHTML +=
        "<div class='job' id='" +
        doc.id +
        "'><img src='driver.png' class='car-icon' /><div class='job-data'>" +
        doc.data().distanceUnit +
        "s: " +
        doc.data().distance.toFixed(1) +
        "</div><div class='job-data'>Passengers: " +
        doc.data().passengers +
        "</div><div class='job-data'>Cost: " +
        doc.data().cost +
        "KM</div><button class='accept-job'>Accept</button></div>";
    });
  })
  .then(() => {
    const accepts = document.querySelectorAll(".accept-job");
    accepts.forEach((accept) => {
      accept.addEventListener("click", () => {
        const ride = doc(db, "rides", accept.parentElement.id);
        deleteDoc(ride).catch((error) => {
          console.log(error);
        });
        accept.parentElement.remove();
      });
    });
  });
