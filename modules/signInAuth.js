// login.js
import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const auth = getAuth(app);

  let signInBtn = document.getElementById("signInButton");

  signInBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const signInEmailInput = document.getElementById("signInEmailInput");
    const signInPasswordInput = document.getElementById("signInPasswordInput");

    const email = signInEmailInput.value.trim();
    const password = signInPasswordInput.value.trim();

    if (auth.currentUser) {
      signOut(auth)
        .then(() => {
          console.log("user signed out");
        })
        .catch((error) => {
          console.log("error signing out: ", error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user have successfully logged in", user);

          const signInTime = new Date();
          const userRef = ref(db, "/users/" + user.uid);

          update(userRef, {
            timestamp: `${signInTime}`,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing in: ", errorCode, errorMessage);
        });
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      signInBtn.textContent = "Sign Out";
      const dropDownMenu = document.getElementById("dropDownMenu");
      dropDownMenu.innerHTML = `<li><a href="./form.html">Create Event</a></li>
      <li><a href="./adminDashboard.html">Admin Dashboard</a></li>`;
      const userHeaderLinks = document.getElementById("userHeaderLinks");
      userHeaderLinks.innerHTML = `<li id="createEventLink"><a href="./form.html">Create Event</a></li>
      <li id="adminDashboard"><a href="./adminDashboard.html">Admin Dashboard</a></li>`;
      const registerBtn = document.getElementById("registerBtn");
      if (registerBtn) {
        registerBtn.remove();
      }
    } else {
      signInBtn.textContent = "Sign In";
      const createEventLink = document.getElementById("createEventLink");
      if (createEventLink) {
        createEventLink.remove();
      }
      const adminDashboard = document.getElementById("adminDashboard");
      if (adminDashboard) {
        adminDashboard.remove();
      }
      const logInForm = document.querySelector(".signIn-form");
      const registerBtn = document.createElement("a");
      registerBtn.className = "action_btn";
      registerBtn.id = "registerBtn";
      registerBtn.href = "./register.html";
      registerBtn.innerText = "Register";
      logInForm.appendChild(registerBtn);
      const dropDownMenu = document.getElementById("dropDownMenu");
      dropDownMenu.innerHTML = `<li><a href="./register.html" class="action_btn">Register</a></li>`;
    }
  });
});
