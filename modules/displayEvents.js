import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  update
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export function displayEvents(collectionName, filterByName = "") {
  get(child(ref(db), `${collectionName}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const allEvents = snapshot.val();
        const eventsContainer = document.createElement("div");
        eventsContainer.id = "eventsContainer";
        for (let event in allEvents) {
          const eventData = allEvents[event];
          // Check if the event name matches the filter
          if (
            filterByName === "" ||
            eventData.name.toLowerCase().includes(filterByName.toLowerCase())
          ) {
            const eventCard = document.createElement("div");
            eventCard.className = "eventCard";
            const name = document.createElement("p");
            name.className = "eventName";
            name.innerText = eventData.name;
            const location = document.createElement("p");
            location.className = "eventLocation";
            location.innerText = eventData.location;
            const image = document.createElement("img");
            image.className = "eventImage";
            image.src = eventData.imageUrl;
            image.setAttribute("alt", "event image");
            const description = document.createElement("p");
            description.className = "eventDescription";
            description.innerText = eventData.description;
            const date = document.createElement("p");
            date.className = "eventDate";
            date.innerText = eventData.date;
            const time = document.createElement("p");
            time.className = "eventTime";
            time.innerText = eventData.time;

            // pridejau heart icona ir jos funkcionaluma

            const likeButton = document.createElement("button");
            likeButton.className = "likeButton";
            const heartIcon = document.createElement("i");
            heartIcon.className = "fa-solid fa-heart fa-2x";
            likeButton.appendChild(heartIcon);
            const likeCount = document.createElement("p");
            likeCount.className = "likeCount";
            likeCount.innerText = `Likes: ${eventData.likes || 0}`;

            likeButton.addEventListener("click", () => {

              const eventRef = ref(db, `${collectionName}/${event}`);
              update(eventRef, {
                likes: eventData.likes ? eventData.likes + 1 : 1
              });

              heartIcon.classList.toggle("liked");
            });

            eventsContainer.append(eventCard);
            eventCard.append(name, location, image, description, date, time, likeButton, likeCount);
          }
        }
        const main = document.getElementById("main");
        // Clear existing content before appending new events
        main.innerHTML = "";
        main.append(eventsContainer);
      } else {
        console.log("No events found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
