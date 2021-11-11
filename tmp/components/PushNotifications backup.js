import React, { useState, useEffect, useContext } from "react";
import { getToken, onMessageListener } from "../libs/Firebase";
import { StatusContext } from "../providers/StatusProvider";

function PushNotifications() {
  const [messages, setMessages] = useState([]);
  const [showNotifications, setshowNotifications] = useState(false);
  const { status, setStatus } = useContext(StatusContext);
  // eslint-disable-next-line
  //const [token, setToken] = useState(null);

  /**
   * TODO:
   *  - better handle status of request, from token: allowed / denied / to be asked
   *  - use a better layout to show status of request (preparing for more variables, in the future (geolocalization, ...)
   */
  
// TODO: use only status.pushNotifications

  useEffect(() => { // TODO: save timestamp of last getToken(), and repeat it not more often than one week...
    console.log("calling getToken");
    //getToken(setToken);
    getToken();
console.log("PushNotifications.js: status.pushNotifications:", status.pushNotifications);
  }, [status]);

  onMessageListener().then(message => {
    console.info("Received foreground push message:", message);
    setMessages([message, ...messages]);
    setshowNotifications(true);
  }).catch(err => {
    console.error('error listening to push messages:', err);
  });
  
  useEffect(() => {
    if (showNotifications) {
      setStatus({pushNotifications: messages});
      //setMessages([]);
      //setshowNotifications(false);
    }
  }, [showNotifications, messages, setStatus]);

  return null;
}

export default React.memo(PushNotifications);