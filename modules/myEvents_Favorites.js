import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  const navbar = document.getElementById("navbaras");

  if (user) {
    const linksDiv = document.createElement("div");
    linksDiv.classList.add("eventsFavoritesLinks");
    linksDiv.style.display = "flex";
    linksDiv.style.listStyleType = "none";
    linksDiv.style.padding = "0";
    linksDiv.style.margin = "0";
    linksDiv.innerHTML = `
    <li><a href="#">My Events</a></li>
    <li style="margin-left: 15px; margin-right: 15px" ><a href="#">My Favorites</a></li>
  `;
    navbar.appendChild(linksDiv);
  } else {
    const eventsFavoritesDiv = document.querySelector(".eventsFavoritesLinks");
    if (eventsFavoritesDiv) {
      eventsFavoritesDiv.remove();
    }
  }
});