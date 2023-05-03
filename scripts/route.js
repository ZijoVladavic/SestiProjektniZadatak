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

var from;
var to;
var isOn = true;

$(function () {
  $("#map2").locationpicker({
    location: { latitude: 43.852886439552385, longitude: 18.391091942787163 },
    radius: 0,
    inputBinding: {
      locationNameInput: $("#location2"),
    },
    enableAutocomplete: true,
    onchanged: function (currentLocation, radius, isMarkerDropped) {
      to = currentLocation;
    },
  });
});

var result;

function showPosition() {
  // Store the element where the page displays the result
  result = document.getElementById("location1");

  // If geolocation is available, try to get the visitor's position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    result.value = "Getting the position information...";
  } else {
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }
}

// Define callback function for successful attempt
function successCallback(position) {
  result.innerHTML = "";
  $(function () {
    $("#map1").locationpicker({
      location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      radius: 0,
      inputBinding: {
        locationNameInput: $("#location1"),
      },
      enableAutocomplete: true,
      onchanged: function (currentLocation, radius, isMarkerDropped) {
        from = currentLocation;
      },
    });
  });
}

// Define callback function for failed attempt
function errorCallback(error) {
  if (error.code == 1) {
    result.value =
      "You've decided not to share your position, but it's OK. We won't ask you again.";
  } else if (error.code == 2) {
    result.value =
      "The network is down or the positioning service can't be reached.";
  } else if (error.code == 3) {
    result.value =
      "The attempt timed out before it could get the location data.";
  } else {
    result.value = "Geolocation failed due to unknown error.";
  }
}
showPosition();

document.getElementById("location").addEventListener("click", () => {
  if (isOn) {
    document.querySelector("#location").innerHTML = "Location: <b>OFF</b>";
    isOn = false;
    document.querySelector("#location").style = "background-color: #F15A59;";
    successCallback({
      coords: {
        latitude: 43.852886439552385,
        longitude: 18.391091942787163,
      },
    });
  } else {
    document.querySelector("#location").innerHTML = "Location: <b>ON</b>";
    isOn = true;
    document.querySelector("#location").style = "background-color: #5d9c59;";
    document.querySelector("#temp").innerHTML =
      "<div id='map1' class='map'></div>";
    showPosition();
  }
});

if (sessionStorage.getItem("driver") === "true") {
  window.open("driverdash.html", "_self");
}

const passengers = document.querySelector("#passengers");
document.getElementById("+").addEventListener("click", () => {
  if (passengers.innerHTML < 9) {
    passengers.innerHTML++;
  }
});

document.getElementById("-").addEventListener("click", () => {
  if (passengers.innerHTML > 1) {
    passengers.innerHTML--;
  }
});

async function fetchDistance(point1, point2) {
  const response = await fetch(
    "http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=" +
      point1 +
      "&wp.1=" +
      point2 +
      "&avoid=minimizeTolls&key=AkfdroxORH_5P7IFpQFD-9HEgKT4k3bX9TVwUtwoy-wyIGL_n7n9B94e1rkkJy4i"
  );
  const data = await response.json();
  return data;
}

document.getElementById("confirm").addEventListener("click", () => {
  if (from && to) {
    const passengers = document.querySelector("#passengers").innerHTML;

    const point1 = from.latitude + "," + from.longitude;
    const point2 = to.latitude + "," + to.longitude;

    //https://learn.microsoft.com/en-us/bingmaps/rest-services/examples/driving-route-example

    fetchDistance(point1, point2).then((result) => {
      const data = result.resourceSets[0].resources[0];
      const cost = (
        (data.travelDistance * (data.travelDuration / 60)) /
        2
      ).toFixed(1);

      addDoc(ridesCollection, {
        passengers: passengers,
        from: from.latitude + "," + from.longitude,
        to: to.latitude + "," + to.longitude,
        distance: data.travelDistance,
        distanceUnit: data.distanceUnit,
        duration: data.travelDuration,
        durationUnit: data.durationUnit,
        cost: cost,
      }).then(() => {
        window.open("riderdash.html", "_self");
      });
    });
  } else {
    alert("Please input both locations!");
  }
});
