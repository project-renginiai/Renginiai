import { firebaseConfig } from "../firebase.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {
  getDatabase,
  ref,
  update,
  set,
  onValue,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

document.addEventListener("DOMContentLoaded", function () {
  const app = initializeApp(firebaseConfig)
  const db = getDatabase()
  const dbRef = ref(getDatabase())

  const userManagment = document.querySelectorAll(".ManageUsersBtn")
  const eventManagment = document.querySelector(".ManageEventsBtn")

  userManagment.forEach((el) => {
    el.addEventListener("click", (event) => {
      get(child(dbRef, "/users/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const removeCards = document.querySelectorAll(".UserCard")
            removeCards.forEach((el) => el.remove())
            const cardContainer = document.querySelector("#multi")
            for (let user in data) {
              const users = data[user]

              const card = document.createElement("div")
              card.className = "UserCard"

              const emailInfo = document.createElement("div")
              emailInfo.innerText = `Email: ${users.email}`

              const roleInfo = document.createElement("div")
              roleInfo.innerText = `Role: ${users.role}`

              card.append(emailInfo, roleInfo)
              cardContainer.appendChild(card)
            }
          } else {
            console.log("no data availabele")
          }
        })
        .catch((error) => {
          console.error(error)
        })
    })
  })
})
