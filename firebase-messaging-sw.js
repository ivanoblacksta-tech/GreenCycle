importScripts("https://www.gstatic.com/firebasejs/12.9.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCOg6UAYRlalONwwGxnjM70R4rw6id8NxQ",
  authDomain: "greencycle-9149e.firebaseapp.com",
  projectId: "greencycle-9149e",
  storageBucket: "greencycle-9149e.firebasestorage.app",
  messagingSenderId: "887421841576",
  appId: "1:887421841576:web:054c223ef8d7778dc5929d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/icon.png"
    }
  );
});