import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

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

            // Check if current user is the creator of the event
            onAuthStateChanged(auth, (user) => {
              if (user && user.email === eventData.creator) {
                const likeButton = document.createElement("button");
                likeButton.className = "likeButton";
                const heartIcon = document.createElement("i");
                heartIcon.className = "fa-solid fa-heart fa-2x";
                likeButton.appendChild(heartIcon);
                const likeCount = document.createElement("p");
                likeCount.className = "likeCount";
                likeCount.innerText = `Likes: ${eventData.likes || 0}`;
                likeButton.addEventListener("click", async (e) => {
                  e.preventDefault();
                  const eventRef = ref(db, `${collectionName}/${event}`);
                  const eventLikedByRef = ref(
                    db,
                    `${collectionName}/${event}/likedBy`,
                  );
                  const eventDataSnapshot = await get(eventRef);
                  if (eventDataSnapshot.exists()) {
                    const eventData = eventDataSnapshot.val();
                    const currentLikes = eventData.likes || 0;

                    if (heartIcon.classList.contains("liked")) {
                      update(eventRef, {
                        likes: currentLikes - 1,
                      });
                      update(eventLikedByRef, {
                        [user.uid]: null,
                      });
                    } else {
                      update(eventRef, {
                        likes: currentLikes + 1,
                      });
                      update(eventLikedByRef, {
                        [user.uid]: true,
                      });
                    }
                    heartIcon.classList.toggle("liked");
                    likeCount.innerText = `Likes: ${
                      heartIcon.classList.contains("liked")
                        ? currentLikes + 1
                        : currentLikes - 1
                    }`;
                  }
                });
                eventCard.append(likeButton, likeCount);
              } else {
                const likeButtons = document.querySelectorAll(".likeButton");
                likeButtons.forEach((el) => el.remove());
                const likeCounters = document.querySelectorAll(".likeCount");
                likeCounters.forEach((el) => el.remove());
              }
            });
            eventsContainer.append(eventCard);
            eventCard.append(name, location, image, description, date, time);
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

export function displayUserEvents(filterByName = "") {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log("No user signed in");
    return;
  }

  get(child(ref(db), "approvedEvents/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const allEvents = snapshot.val();
        const eventsContainer = document.createElement("div");
        eventsContainer.id = "eventsContainer";

        for (let eventId in allEvents) {
          const eventData = allEvents[eventId];
          // Check if the event name matches the filter
          if (
            filterByName === "" ||
            eventData.name.toLowerCase().includes(filterByName.toLowerCase())
          ) {
            // Check if current user is the creator of the event
            if (currentUser.email === eventData.creator) {
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

              const likeButton = document.createElement("button");
              likeButton.className = "likeButton";
              const heartIcon = document.createElement("i");
              heartIcon.className = "fa-solid fa-heart fa-2x";
              likeButton.appendChild(heartIcon);
              const likeCount = document.createElement("p");
              likeCount.className = "likeCount";
              likeCount.innerText = `Likes: ${eventData.likes || 0}`;
              likeButton.addEventListener("click", async (e) => {
                e.preventDefault();
                const eventRef = ref(db, `approvedEvents/${eventId}`);
                const eventLikedByRef = ref(
                  db,
                  `approvedEvents/${eventId}/likedBy`,
                );
                const eventDataSnapshot = await get(eventRef);
                if (eventDataSnapshot.exists()) {
                  const eventData = eventDataSnapshot.val();
                  const currentLikes = eventData.likes || 0;

                  if (heartIcon.classList.contains("liked")) {
                    update(eventRef, {
                      likes: currentLikes - 1,
                    });
                    update(eventLikedByRef, {
                      [currentUser.uid]: null,
                    });
                  } else {
                    update(eventRef, {
                      likes: currentLikes + 1,
                    });
                    update(eventLikedByRef, {
                      [currentUser.uid]: true,
                    });
                  }
                  heartIcon.classList.toggle("liked");
                  likeCount.innerText = `Likes: ${
                    heartIcon.classList.contains("liked")
                      ? currentLikes + 1
                      : currentLikes - 1
                  }`;
                }
              });
              eventCard.append(likeButton, likeCount);

              eventsContainer.append(eventCard);
              eventCard.append(name, location, image, description, date, time);
            }
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
