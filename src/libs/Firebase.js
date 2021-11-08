import firebase from "firebase/app";
import "firebase/messaging";

// TODO: put in .env or config
const firebaseConfig = {
  apiKey: "AIzaSyAN-T9JMI8W5oF2Gip2Pcu-E_xtXBB2gE0",
  authDomain: "sistemisolari-quiccasa.firebaseapp.com",
  projectId: "sistemisolari-quiccasa",
  storageBucket: "sistemisolari-quiccasa.appspot.com",
  messagingSenderId: "748892040096",
  appId: "1:748892040096:web:69200876ed8ffa8615d2c5",
  //measurementId: "G-HQVK7VFN1W",
};
// console.firebase.com - Project - Projetc Settings - Cloud Messaging - Certificati Web Push - Coppia di chiavi
const vapidKey = "BJAzYrLnCaD13Cwv61jZGEiTA8yP7SVmPMY2_m0QO0VI8GFDhs_yKap6_3SrZlmf8eAYrdK7UJIsedyOXyY5ulY";

if (!firebase.apps.length) { // if never inizialized, inizialize app
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging;
try {
  messaging = firebase.messaging();
} catch (err) {
  console.info("This browser does not support Firebase SDK");
  messaging = {}; // create a dummy messaging object
  messaging.getToken = async() => {};
  messaging.onMessage = async() => {};
}

export const getToken = (setToken) => {
  return messaging.getToken({vapidKey}).then((currentToken) => {
    if (currentToken) {
      console.info("current token for client:", currentToken);
      if (setToken) setToken(currentToken);
      // track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.info("No registration token available, requesting permission to generate one...");
      if (setToken) setToken(null);
      // shows on the UI that permission is required
    }
  }).catch(err => { // catch error while creating client token
    if (err.code === "messaging/permission-blocked") {
      console.error("Notification permission denied by user, token not retrieved");
    } else {
      if (err.code === "messaging/failed-service-worker-registration") {
        console.error("Service worker registration failed");
      } else {
        console.error("Error while creating client token:", JSON.stringify(err));
      }
    }
    setToken(null);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});
