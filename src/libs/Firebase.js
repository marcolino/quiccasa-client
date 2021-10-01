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
//const vapidKey = "BIvd28CJhQk0nTEdB0nBqGgwspf0ZjtXEtySVXLBRAbuVy0fofllQrIkz6oRHRQASP76O52cLzubRT1uL44ZIyw"; OLD
const vapidKey = "BCpsekmZpDC8aasvRsr-xea2Alw_iLj6De0SWWIZMCBU7Da_nIl2S58Dr8CE9sG4d062uhSTT-2Z0eF64jtNbQU";

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

export const getToken = (setTokenFound, setToken) => {
  return messaging.getToken({vapidKey}).then((currentToken) => {
    if (currentToken) {
      console.info("current token for client:", currentToken);
      setTokenFound(true);
      setToken(currentToken);
      // track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.info("No registration token available, requesting permission to generate one...");
      setTokenFound(false);
      setToken(null);
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
    setTokenFound(false);
    setToken(null);
  });
}

export const subscribeTokenToTopic = (token, topic) => {
  fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'key=AAAArl1xq6A:APA91bG9IExDRYr-6rKKIiX358_rz6hpuigqHI7wuII4no3Yq1uraVpr8ijb-ywMxPWyVWjceXi5ILcJdg5awab4i2aqTZ6ivUktL_ZYSd3qNapNA1qQsb0ZN8oPXDEdiKN_FwnNK2eN'
    })
  }).then(response => {
    if (response.status < 200 || response.status >= 400) {
      throw new Error('Error subscribing to topic: ' + response.status + ' - ' + JSON.parse(response.text()));
    }
    console.log('Subscribed to topic "' + topic + '"');
  }).catch(error => {
    console.error(error);
  })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});
