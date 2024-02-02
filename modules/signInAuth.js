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
          const user = userCredential.user;
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
    } else {
      signInBtn.textContent = "Sign In";
    }
  });
});
