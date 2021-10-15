import { useState, useEffect } from "react";
import { toastNotification } from "./ToastNotification";
import { getToken, /*subscribeTokenToTopic, */onMessageListener } from "../libs/Firebase";

export default function PushNotifications() {
  const [message, setMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [askForNotificationsPermission, setAskForNotificationsPermission] = useState(false);
  const [tokenFound, setTokenFound] = useState(false);
  // eslint-disable-next-line
  const [token, setToken] = useState(null);

  /**
   * TODO:
   *  - better handle status of request, from token: allowed / denied / to be asked
   *  - use a better layout to show status of request (preparing for more variables, in the future (geolocalization, ...)
   */
  
  useEffect(() => { // TODO: save timestamp of last getToken(), and repeat it not more often than one week...
    console.log("calling getToken");
    getToken(setTokenFound, setToken);
  }, []);

  // useEffect(() => {
  //   console.log("calling subscribeTokenToTopic");
  //   subscribeTokenToTopic(token, 'pushtest');
  // }, [token]);

  onMessageListener().then(message => {
    console.info("got push message:", message);
    setMessage(message);
    setShowNotification(true);
  }).catch(err => {
    console.error('error listening to push messages:', err);
  });
  
  useEffect(() => {
    if (showNotification) {
      if (message) { // TODO: design a better graphical output...
        toastNotification.info(`Title: ${message.notification.title}, Body: ${message.notification.body}, Icon: ${message.notification.icon}, Priority: ${message.priority}, Tag: ${message.notification.tag}`);
        setMessage(null);
      }
      setShowNotification(false);
    }
  }, [showNotification, message]);

  useEffect(() => {
    if (askForNotificationsPermission) {
      toastNotification.info("Forcing system notification persmission request...");
      setAskForNotificationsPermission(false);
    }
  }, [askForNotificationsPermission]);

  return (
    <>
      {tokenFound && (
        <p> Notification permission enabled 👍🏻 </p>
      )}
      {!tokenFound && (
        <>
          <p> Notification permission not enabled 🙏 </p>
          <button onClick={() => setAskForNotificationsPermission(true)}>Allow Push Notifications</button>
        </>
      )}
    </>
  );
}
