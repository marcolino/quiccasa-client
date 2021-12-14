import React, { /*useState, */useEffect, useContext } from "react";
import { getToken, onMessageListener } from "../libs/Firebase";
import { StatusContext } from "../providers/StatusProvider";

function PushNotifications() {
  const { status, setStatus } = useContext(StatusContext);

  useEffect(() => { // TODO: save timestamp of last getToken(), and repeat it not more often than one week...
    console.log("PushNotifications - calling getToken");
    getToken();
    //getToken(setToken);
  }, [status]);

  onMessageListener().then(message => {
    setStatus({pushNotifications: [message, ...status.pushNotifications]});
  }).catch(err => {
    console.error('error listening to push messages:', err);
  });

  return null;
}

export default React.memo(PushNotifications);
