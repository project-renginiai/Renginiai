import { firebaseConfig } from "../firebase.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {
  getDatabase,
  ref,
  update,
  set,
  push,
  onValue,
  child,
  remove,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

document.addEventListener("DOMContentLoaded", function () {
  const app = initializeApp(firebaseConfig)
  const db = getDatabase()
  const dbRef = ref(getDatabase())

  const userManagment = document.querySelectorAll(".ManageUsersBtn")
  const eventManagment = document.querySelectorAll(".ManageEventsBtn")
  const categoriesManagement = document.querySelectorAll(".ManageCategoriesBtn")

  userManagment.forEach((el) => {
    el.addEventListener("click", (event) => {
      get(child(dbRef, "/users/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const removeCards = document.querySelectorAll(".UserCard")
            removeCards.forEach((el) => el.remove())
            const removeEvents = document.querySelectorAll(".eventCard")
            removeEvents.forEach((el) => el.remove())
            const cardContainer = document.querySelector("#eventsContainer")
            for (let user in data) {
              const users = data[user]
              if (users.role == "simple") {
                const card = document.createElement("div")
                card.className = "UserCard"

                const emailInfo = document.createElement("div")
                emailInfo.innerText = `Email: ${users.email}`

                const roleInfo = document.createElement("div")
                roleInfo.innerText = `Role: ${users.role}`

                const buttonBox = document.createElement("div")
                buttonBox.className = "adminButtonBox"
                const removeButton = document.createElement("button")
                removeButton.className = "removeButton"
                removeButton.innerText = "Remove User"
                removeButton.addEventListener("click", (event) => {
                  const userFromDB = ref(db, `/users/${user}`)
                  remove(userFromDB)
                  card.remove()
                })
                buttonBox.append(removeButton)
                card.append(emailInfo, roleInfo, buttonBox)
                cardContainer.appendChild(card)
              }
            }
          } else {
            alert("no data available")
          }
        })
        .catch((error) => {
          console.error(error)
        })
    })
  })

  eventManagment.forEach((el) => {
    el.addEventListener("click", (event) => {
      get(child(dbRef, "/newEvents/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const removeCards = document.querySelectorAll(".UserCard")
            removeCards.forEach((el) => el.remove())
            const removeEvents = document.querySelectorAll(".eventCard")
            removeEvents.forEach((el) => el.remove())
            const cardContainer = document.querySelector("#eventsContainer")
            for (let event in data) {
              const events = data[event]

              const card = document.createElement("div")
              card.className = "eventCard"
              card.style.margin = "5px"

              const eventName = document.createElement("div")
              eventName.innerText = `Name: ${events.name}`
              eventName.className = "eventName"

              const eventImage = document.createElement("img")
              eventImage.setAttribute("src", events.imageUrl)
              eventImage.setAttribute("alt", "image")
              eventImage.className = "eventImage"

              const eventDescription = document.createElement("div")
              eventDescription.innerText = `Description: ${events.description}`
              eventDescription.className = "eventDescription"

              const eventLocation = document.createElement("div")
              eventLocation.innerText = `Location: ${events.location}`
              eventLocation.className = "eventLocation"

              const eventDate = document.createElement("div")
              eventDate.innerText = `Date: ${events.time} ${events.date}`
              eventDate.className = "eventDate"

              const buttonBox = document.createElement("div")
              buttonBox.className = "adminButtonBox"
              const approveButton = document.createElement("button")
              approveButton.className = "approveButton"
              approveButton.innerText = "Approve"
              approveButton.addEventListener("click", (ev) => {
                set(push(ref(db, "approvedEvents/")), {
                  name: events.name,
                  location: events.location,
                  date: events.date,
                  time: events.time,
                  description: events.description,
                  imageUrl: events.imageUrl,
                  creator: events.creator
                })
                const eventFromDB = ref(db, `/newEvents/${event}`)
                remove(eventFromDB)
                card.remove()
              })
              const rejectButton = document.createElement("button")
              rejectButton.className = "rejectButton"
              rejectButton.innerText = "Reject"
              rejectButton.addEventListener("click", (ev) => {
                const eventFromDB = ref(db, `/newEvents/${event}`)
                remove(eventFromDB)
                card.remove()
              })

              buttonBox.append(approveButton, rejectButton)
              card.append(
                eventName,
                eventImage,
                eventDescription,
                eventLocation,
                eventDate,
                buttonBox
              )
              cardContainer.append(card)
            }
          } else {
            alert("no data available")
          }
        })
        .catch((error) => {
          console.error(error)
        })
    })
  })
})
