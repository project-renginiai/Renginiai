import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { displayEvents } from "./displayEvents.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

document
  .querySelector(".search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const queryText = document.getElementById("searchInput").value.trim();
    if (queryText !== "") {
      displayEvents("approvedEvents", queryText);
      //   const searchResults = [];
      //   const eventsRef = ref(db, "events");

      //   const eventsSnapshot = await get(eventsRef);

      //   eventsSnapshot.forEach((childSnapshot) => {
      //     const eventData = childSnapshot.val();

      //     for (const key in eventData) {
      //       if (eventData[key].toLowerCase().includes(queryText.toLowerCase())) {
      //         searchResults.push(eventData);
      //         break;
      //       }
      //     }
      //   });

      //   console.log("Search Results:", searchResults);
    }
  });
