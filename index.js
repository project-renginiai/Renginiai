/** @format */

const doc = document;
const toggleBtn = doc.querySelector(".toggle_btn");
const toggleBtnIcon = doc.querySelector(".toggle_btn i");
const dropDownmenu = doc.querySelector(".dropdown_menu");

toggleBtn.onclick = function (params) {
  dropDownmenu.classList.toggle("open");
  const isOpen = dropDownmenu.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

import { displayEvents } from "./modules/displayEvents.js";
displayEvents("approvedEvents")


import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid)
  }
});
