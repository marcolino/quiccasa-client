import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ToastContainer, toast } from "./components/Toasts";
import { i18n } from "./i18n";

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// function sendToAnalytics(metric) {
//   const body = JSON.stringify({[metric.name]: metric.value});
//   (navigator.sendBeacon && navigator.sendBeacon("/analytics", body)) ||
//     fetch("/analytics", {body, method: "POST", keepalive: true});
// }

// reportWebVitals(sendToAnalytics);
reportWebVitals(console.log);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register();
console.log('TEST I18N SW:', i18n.t("Join !"));
// TODO: test receving messages from SW to be ble to i18n them:

// //navigator.serviceWorker.addEventListener('message', (e) => {...}) // should work too
// navigator.serviceWorker.onmessage = function(e) {
//   console.log('e.data', e.data);
//   console.log('e.data.level:', e.data.level);
//   console.log('e.data.message:', e.data.message);
//   toast.info(t(e.data.message)); // TODO: toast[e.data.level](t(e.data.message);
// }

//const broadcastChannel = new BroadcastChannel("sw-messages-i18n");
//broadcastChannel.postMessage({level: 'warning', message: "Hello from SW"});

// From your client pages:
const channel = new BroadcastChannel("sw-messages-i18n");
channel.addEventListener("message", event => {
  console.log("Received:", event.data);
  toast.info(i18n.t(event.data.message));
  toast[event.data.level](i18n.t(event.data.message));
});