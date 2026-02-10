import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCOg6UAYRlalONwwGxnjM70R4rw6id8NxQ",
  authDomain: "greencycle-9149e.firebaseapp.com",
  projectId: "greencycle-9149e",
  storageBucket: "greencycle-9149e.firebasestorage.app",
  messagingSenderId: "887421841576",
  appId: "1:887421841576:web:054c223ef8d7778dc5929d"
};

// 🔔 VAPID KEY
const VAPID_KEY = "BP6yx3aG4JwjPLxBRj54LBBtQ1PZB3FRUOiwhUyGB91m9zQUeKN8oO3vycASET01jKPccJxCYN3ji4H37ykJzy0";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

// 🔹 Register Service Worker (relative path for GitHub Pages)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("firebase-messaging-sw.js")
    .then(reg => console.log("SW registered", reg))
    .catch(err => console.error("SW registration failed", err));
}

// 🔹 Enable Notifications button
document.getElementById("enable").onclick = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Permission denied");
      return;
    }
    
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (!token) {
      alert("Impossible de récupérer le token. Vérifiez le SW.");
      return;
    }
    
    // Save token in Firestore
    await setDoc(doc(db, "tokens", token), {
      token,
      createdAt: Date.now()
    });
    
    alert("Notifications activées ✅");
    console.log("Token enregistré:", token);
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'activation des notifications");
  }
};

// 🔹 Foreground messages
onMessage(messaging, payload => {
  alert(payload.notification.title + "\n" + payload.notification.body);
});