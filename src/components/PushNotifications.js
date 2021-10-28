import { useState, useEffect, useContext } from "react";
//import { toastNotification } from "./ToastNotification";
import { getToken, onMessageListener } from "../libs/Firebase";
import { StatusContext } from "../providers/StatusProvider";

export default function PushNotifications() {
  const [message, setMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  //const [askForNotificationsPermission, setAskForNotificationsPermission] = useState(false);
  const { setStatus } = useContext(StatusContext);
  // eslint-disable-next-line
  const [token, setToken] = useState(null);

  /**
   * TODO:
   *  - better handle status of request, from token: allowed / denied / to be asked
   *  - use a better layout to show status of request (preparing for more variables, in the future (geolocalization, ...)
   */
  
  useEffect(() => { // TODO: save timestamp of last getToken(), and repeat it not more often than one week...
    console.log("calling getToken");
    getToken(setToken);
  }, []);

  onMessageListener().then(message => {
    console.info("Received foreground push message:", message);
    setMessage(message);
    setShowNotification(true);
  }).catch(err => {
    console.error('error listening to push messages:', err);
  });
  
  useEffect(() => {
    if (showNotification) {
      setStatus({pushNotification: message}); // TODO ...
      if (message) { // TODO: design a better graphical output...
        //toastNotification.info(`Title: ${message.notification.title}, Body: ${message.notification.body}, Icon: ${message.notification.icon}, Priority: ${message.priority}, Tag: ${message.notification.tag}`);
        setMessage(null);
      }
      setShowNotification(false);
    }
  }, [showNotification, message, setStatus]);

  // useEffect(() => {
  //   if (askForNotificationsPermission) {
  //     toastNotification.info("Forcing system notification permission request...");
  //     setAskForNotificationsPermission(false);
  //   }
  // }, [askForNotificationsPermission]);

  return null;
  // return (
  //   <>
  //     {token && (
  //       <p> Notification permission enabled 👍🏻 </p>
  //     )}
  //     {!token && (
  //       <>
  //         <p> Notification permission not enabled 🙏 </p>
  //         <button onClick={() => setAskForNotificationsPermission(true)}>Allow Push Notifications</button>
  //       </>
  //     )}
  //   </>
  // );
}
