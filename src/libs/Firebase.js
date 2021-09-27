import firebase from "firebase/app";
import "firebase/messaging";

// TODO: put in .env or config
const firebaseConfig = {
  // apiKey: "AIzaSyBXAFWdnCz5SNYKJVXUC01Y70DhYgAgSqo",
  // authDomain: "storemax-50908.firebaseapp.com",
  // projectId: "storemax-50908",
  // storageBucket: "storemax-50908.appspot.com",
  // messagingSenderId: "606599051782",
  // appId: "1:606599051782:web:e53a0dfd668450c729a187"
  apiKey: "AIzaSyAN-T9JMI8W5oF2Gip2Pcu-E_xtXBB2gE0",
  authDomain: "sistemisolari-quiccasa.firebaseapp.com",
  projectId: "sistemisolari-quiccasa",
  storageBucket: "sistemisolari-quiccasa.appspot.com",
  messagingSenderId: "748892040096",
  appId: "1:748892040096:web:69200876ed8ffa8615d2c5",
  //measurementId: "G-HQVK7VFN1W",
  //databaseURL: "DATABASE-URL",
};
//const vapidKey = "BH97plGjFleE6fvFuH_08jfyKG4GTXlZg4tdUcUAwwjOjL0xSPoKAdruBMhW0Qw9G6f7UvaL6yr1VyNbkUvjj8I";
//const vapidKey = "AAAArl1xq6A:APA91bG9IExDRYr-6rKKIiX358_rz6hpuigqHI7wuII4no3Yq1uraVpr8ijb-ywMxPWyVWjceXi5ILcJdg5awab4i2aqTZ6ivUktL_ZYSd3qNapNA1qQsb0ZN8oPXDEdiKN_FwnNK2eN";
  // console.firebase.com - Project - Projetc Settings - Cloud Messaging - Certificati Web Push - Coppia di chiavi
  const vapidKey = "BIvd28CJhQk0nTEdB0nBqGgwspf0ZjtXEtySVXLBRAbuVy0fofllQrIkz6oRHRQASP76O52cLzubRT1uL44ZIyw";

//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) { // if never inizialized, inizialize app
//console.log("new", firebase.apps);
  firebase.initializeApp(firebaseConfig);
} else {
//console.log("old", firebase.apps);
  firebase.app(); // if already initialized, use that one
}

let messaging;
try {
  messaging = firebase.messaging();
} catch (err) {
  console.info("This browser does not support Firebase SDK");
  messaging = {};
  messaging.getToken = async() => {};
  messaging.onMessage = async() => {};
}

export const getToken = (setTokenFound) => {
console.log("gettoken");
  return messaging.getToken({vapidKey}).then((currentToken) => {
console.log("gettoken in messaging");
    if (currentToken) {
      console.info("current token for client:", currentToken);
      setTokenFound(true);
      // track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.info("No registration token available, requesting permission to generate one...");
      setTokenFound(false);
      // shows on the UI that permission is required
    }
  }).catch(err => { // catch error while creating client token
    if (err.code === "messaging/permission-blocked") {
      console.error("Notification permission not given by user, token not retrieved");
    } else {
      if (err.code === "messaging/failed-service-worker-registration") {
        console.error("Service worker registration failed");
      } else {
        console.error("Error was:", JSON.stringify(err));
      }
    }
    setTokenFound(false);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});
