import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push
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
    const createEventBtn = document.getElementById("createEventButton");
    createEventBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const userID = user.uid
        const eventCreateForm = document.getElementById("eventCreateForm")
        const eventNameInput = document.getElementById("eventNameInput").value
        const eventLocationInput = document.getElementById("eventLocationInput").value
        const eventDateInput = document.getElementById("eventDateInput").value
        const eventTimeInput = document.getElementById("eventTimeInput").value
        const eventDescriptionInput = document.getElementById("eventDescriptionInput").value
        const eventImageUrlInput = document.getElementById("eventImageUrlInput").value
    
        if (
            !eventNameInput ||
            !eventLocationInput ||
            !eventDateInput ||
            !eventTimeInput ||
            !eventDescriptionInput||
            !eventImageUrlInput
        ) {
            alert("Please fill in all the fields.");
            return;
        }
    
        set(push(ref(db, "newEvents/")), {
            name: eventNameInput,
            location: eventLocationInput,
            date: eventDateInput,
            time: eventTimeInput,
            description: eventDescriptionInput,
            imageUrl: eventImageUrlInput,
            creator: userID
        })
            .then(() => {
                alert("Event added succesfully");
                eventCreateForm.reset();
            })
            .catch((err) => {
                console.log(err);
            });
    });
  }
});

