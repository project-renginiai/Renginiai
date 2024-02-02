// register.js
import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const auth = getAuth(app);

  let registerBtn = document.getElementById("registerButton");

  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const registerEmailInput = document.getElementById("registerEmailInput");
    const registerPasswordInput = document.getElementById(
      "registerPasswordInput",
    );

    const email = registerEmailInput.value.trim();
    const password = registerPasswordInput.value.trim();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        const registerTime = new Date();
        set(ref(db, "/users/" + user.uid), {
          email: email,
          role: "simple",
          timestamp: `${registerTime}`,
        });
        console.log("new user has been created");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
});
