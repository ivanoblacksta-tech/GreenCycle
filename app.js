import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔥 YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCOg6UAYRlalONwwGxnjM70R4rw6id8NxQ",
  authDomain: "greencycle-9149e.firebaseapp.com",
  projectId: "greencycle-9149e",
  storageBucket: "greencycle-9149e.firebasestorage.app",
  messagingSenderId: "887421841576",
  appId: "1:887421841576:web:054c223ef8d7778dc5929d"
};

// 🔔 YOUR VAPID KEY
const VAPID_KEY = "BP6yx3aG4JwjPLxBRj54LBBtQ1PZB3FRUOiwhUyGB91m9zQUeKN8oO3vycASET01jKPccJxCYN3ji4H37ykJzy0";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/firebase-messaging-sw.js");
}

document.getElementById("enable").onclick = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Permission denied");
    return;
  }
  
  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY
  });
  
  if (token) {
    await setDoc(doc(db, "tokens", token), {
      token,
      createdAt: Date.now()
    });
    alert("Notifications enabled ✅");
  }
};

// Foreground notification
onMessage(messaging, payload => {
  alert(
    payload.notification.title + "\n" +
    payload.notification.body
  );
});