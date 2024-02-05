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