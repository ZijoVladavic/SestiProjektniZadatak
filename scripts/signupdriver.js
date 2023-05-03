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

document.querySelector("#signup").addEventListener("click", signup);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    signup();
  }
});

function signup() {
  var emailInUse = false;
  var nameInUse = false;

  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const firstname = document.querySelector("#firstname").value;
  const lastname = document.querySelector("#lastname").value;
  const password = document.querySelector("#password").value;
  const confirmpassword = document.querySelector("#confirmpassword").value;
  const phone = document.querySelector("#phone").value;
  const city = document.querySelector("#city").value;
  const post = document.querySelector("#post").value;
  const licence = document.querySelector("#licence").value;
  const jmbg = document.querySelector("#jmbg").value;
  const plate = document.querySelector("#plate").value;

  getDocs(usersCollection)
    .then((docs) => {
      docs.forEach((doc) => {
        if (doc.data().email === email) {
          emailInUse = true;
        }
        if (doc.data().username === username) {
          nameInUse = true;
        }
      });
    })
    .then(() => {
      if (
        email === "" ||
        username === "" ||
        password === "" ||
        confirmpassword === "" ||
        phone === "" ||
        licence === "" ||
        plate === "" ||
        jmbg === ""
      ) {
        alert("Fill in the required fields!");
      } else if (password !== confirmpassword) {
        alert("Passwords don't match!");
      } else if (emailInUse) {
        alert("This email is already in use!");
      } else if (nameInUse) {
        alert("This username is already in use!");
      } else {
        addDoc(usersCollection, {
          email: email,
          username: username,
          pass: password,
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          city: city,
          post: post,
          isDriver: true,
          licence: licence,
          jmbg: jmbg,
          plate: plate,
        }).then((doc) => {
          sessionStorage.setItem("driver", "true");
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("id", doc.id);
          window.open("driverdash.html", "_self");
        });
      }
    });
}
