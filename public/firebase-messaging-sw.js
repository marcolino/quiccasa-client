// scripts for firebase and firebase messaging
// NOTE: be sure to import the same version of the scripts as firebase version in package.json dependency
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

// initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAN-T9JMI8W5oF2Gip2Pcu-E_xtXBB2gE0",
  authDomain: "sistemisolari-quiccasa.firebaseapp.com",
  projectId: "sistemisolari-quiccasa",
  storageBucket: "sistemisolari-quiccasa.appspot.com",
  messagingSenderId: "748892040096",
  appId: "1:748892040096:web:69200876ed8ffa8615d2c5",
};

firebase.initializeApp(firebaseConfig);

// retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
    tag: payload.notification.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});