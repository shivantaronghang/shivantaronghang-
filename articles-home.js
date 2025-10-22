// Firebase Email Subscription Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Your Firebase config (replace with your own credentials)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbCzM9elfsZhhGKh6fNByu3Ddi0en-Uzk",
  authDomain: "civilization3-articles.firebaseapp.com",
  projectId: "civilization3-articles",
  storageBucket: "civilization3-articles.firebasestorage.app",
  messagingSenderId: "707258991811",
  appId: "1:707258991811:web:60f62cb5e7b78411704e76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle subscription form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribe-form");
  const message = document.getElementById("subscribe-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value.trim();

    if (!email) return;

    try {
      await addDoc(collection(db, "subscribers"), {
        email: email,
        createdAt: serverTimestamp()
      });

      message.textContent = `Thank you for subscribing, ${email}!`;
      message.style.color = "#38bdf8";
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.textContent = "Error subscribing. Please try again later.";
      message.style.color = "red";
    }
  });
});

npm install firebase