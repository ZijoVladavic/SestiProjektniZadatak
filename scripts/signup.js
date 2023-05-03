if (sessionStorage.getItem("username") !== null) {
  if (sessionStorage.getItem("driver") === "true")
    window.open("driverdash.html", "_self");
  else window.open("riderdash.html", "_self");
}

document.querySelector("#driver").addEventListener("click", () => {
  window.open("signupdriver.html", "_self");
});

document.querySelector("#rider").addEventListener("click", () => {
  window.open("signuprider.html", "_self");
});
