// FIREBASE

import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

// -------------------------

// REGISTER EVENT LISTENER

let registerBtn = document.getElementById("registerButton");

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();

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
      console.log("new user have been created");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

// STATE CHECK

onAuthStateChanged(auth, (user) => {
  if (user) {
    signInBtn.textContent = "Sign Out";
  } else {
    signInBtn.textContent = "Sign In";
  }
});

// SIGN IN EVENT LISTENER

let signInBtn = document.getElementById("signInButton");

signInBtn.addEventListener("click", (event) => {
  event.preventDefault();

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
        console.log("user have succesfully logged in", user);

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
