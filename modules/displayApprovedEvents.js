import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function displayApprovedEvents() {
    get(child(ref(db), "approvedEvents/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allEvents = snapshot.val();
          const eventsContainer = document.createElement("div");
          eventsContainer.id = "eventsContainer";
          for (let event in allEvents) {
            const eventData = allEvents[event];
            const eventCard = document.createElement("div");
            eventCard.id = "eventCard";
            const name = document.createElement("p");
            name.innerText = eventData.name;
            const location = document.createElement("p");
            location.innerText = eventData.location;
            const image = document.createElement("img");
            image.src = eventData.imageUrl;
            image.setAttribute("alt", "event image");
            const description = document.createElement("p");
            description.innerText = eventData.description;
            const date = document.createElement("p");
            date.innerText = eventData.date;
            const time = document.createElement("p");
            time.innerText = eventData.time;

            eventsContainer.append(eventCard);
            eventCard.append(name, location, image, description, date, time);
          }
          const main = document.getElementById("main")
          main.append(eventsContainer);
        } else {
          console.log("No events found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

displayApprovedEvents()